class MessageTreeController {
    constructor($state, Modals, MessageHelpers, $timeout, $filter, lodash, MessageTrees, FlashBag, toaster, $scope) {
        'ngInject';

        this._Modals = Modals;
        this._lodash = lodash;
        this._$state = $state;
        this._$scope = $scope;
        this._$filter = $filter;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._$timeout = $timeout;
        this._MessageTrees = MessageTrees;
        this._MessageHelpers = MessageHelpers;

        if ($state.current.name === 'app.dashboard.build.message-tree.create') {
            this.tree = {name: 'New Message Tree', messages: [], explicit: true};
        }

        this.$onInit = () => {
            this.active = this.tree;
            this.treeOptions = this._defaultTreeOptions();
        }
    }

    save() {

        if (this.tree.id) {
            return this.tree.put({include: 'messages'}).then((template) => {
                this.tree = template;
                this.active = this.tree;
                this._toaster.pop('success', 'Saved Successfully!');
            });
        }

        this._MessageTrees(this.bot.id).post(this.tree).then(() => {
            this._FlashBag.success("Saved successfully!");
            this._$state.go("app.dashboard.build.message-tree.index");
        });

    }

    toggle(scope) {
        scope.toggle();
    }

    collapseAll() {
        this._$scope.$broadcast('angular-ui-tree:collapse-all');
    }

    expandAll() {
        this._$scope.$broadcast('angular-ui-tree:expand-all');
    }

    duplicate(message, scope) {
        let duplicate = angular.copy(message);
        this._clearIDs(duplicate);
        this._getContainer(scope, message).push(duplicate);
        if (duplicate.type == 'card') {
            this.editCard(duplicate, scope);
        } else if (duplicate.type == 'button') {
            this.editButton(duplicate, scope);
        } else {
            this.edit(duplicate);
        }
    }

    _getParentScope(scope, node) {
        while (scope && scope.node == node) scope = scope.$parent;
        return scope.node ? scope : this;
    }

    _getParentNode(scope, node) {
        let parentScope = this._getParentScope(scope, node);
        return parentScope == this ? this.tree : parentScope.node;
    }

    _getContainer(scope, node) {
        let container = this._getParentNode(scope, node);
        if (node.type == 'button') {
            container = container.buttons;
        } else if (node.type == 'card') {
            container = container.cards;
        } else {
            container = container.messages;
        }
        return container;
    }

    _clearIDs(message) {
        this._lodash.unset(message, 'id');
        let container = message.messages || message.cards || message.buttons;
        if (container) {
            for (let x of container) {
                this._clearIDs(x);
            }
        }
    }

    edit(message) {
        this.active = message;
    }

    editCard(card, scope) {
        let cardContainer = this._getParentNode(scope, card);
        this.edit(cardContainer);
        this._$timeout(() => {
            let hashkey = this._$filter('normalizedHashkey')(cardContainer.$$hashKey);
            let index = cardContainer.cards.indexOf(card);
            angular.element('#carousel_' + hashkey).carousel(index);
        });
    }

    editButton(button, scope) {
        let parentScope = this._getParentScope(scope, button);
        let parent = parentScope.node;
        let delay;
        if (parent.type == 'card') {
            let cardContainer = this._getParentNode(parent, parentScope);
            delay = cardContainer == this.active ? 0 : 400;
            this.editCard(parent, parentScope);
        } else {
            delay = parent == this.active ? 0 : 150;
            this.edit(parent);
        }

        this._$timeout(()=> {
            this._MessageHelpers.openButtonModal(parent.buttons, button);
        }, delay);
    }


    remove(scope) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/delete.modal.html',
            controller: this._confirmDeleteModal,
            cb: confirmed => {
                if (confirmed) {
                    let node = scope.node;
                    if (this.active == node) {
                        this.active = this.tree;
                    }
                    if (node.explicit) {
                        let button = this._getParentNode(scope, node);
                        button.template = undefined;
                    } else {
                        scope.remove();
                    }
                }
            }
        });
    }

    addTextMessage(node) {
        this._addMessage(node, {type: 'text', text: '', buttons: []});
    }

    addImage(node) {
        this._addMessage(node, {type: 'image', image_url: ''});
    }

    addCardContainer(node) {
        this._addMessage(container, {type: 'card_container', cards: []});
    }

    _addMessage(node, message) {
        if (node.type == 'button') {
            node.template = undefined;
        }
        this._MessageHelpers.addMessage(node.messages, message);
        this.edit(message);
    }

    _confirmDeleteModal($scope, close) {
        'ngInject';
        $scope.delete = () => close(true, 500);
        $scope.cancel = () => close(false, 500);
    }

    addTree(tree) {
        this.active.messages = [];
        this.active.template = tree;
    }

    _defaultTreeOptions() {
        return {
            beforeDrop: (e) => {
                let source = e.source.nodeScope.node;
                let destination = e.dest.nodesScope.node ? e.dest.nodesScope.node : undefined;

                console.log(source, destination);

                if (source.type == 'button') {
                    if (destination && (destination.type == 'text' || destination.type == 'card')) {
                        return true;
                    }
                    this._showError("Buttons can only dragged into Text and Card blocks!");
                    return false;
                }

                if (source.type == 'card') {
                    if (destination && destination.type == 'card_container') {
                        return true;
                    }
                    this._showError("Cards can only be dragged into card containers!");
                    return false;
                }

                if (!destination) {
                    return true;
                }

                if (destination.type == 'button') {
                    if (destination.template) {
                        this._showError("Buttons that have associated message trees cannot have other messages.");
                        return false;
                    }
                    return true;
                }

                this._showError("This message can only be dragged under buttons or under the root of the tree.");
                return false;
            }
        }
    }

    _showError(error) {
        this._Modals.errorModal("Drag & Drop Error!", error)
    }


    openSubtreeModal(button) {
        let tree = {
            name: '',
            messages: this._lodash.cloneDeep(button.messages)
        };
        this._clearIDs(tree);

        this._Modals.openModal({
            templateUrl: 'dashboard/build/message-tree/views/subtree.modal.html',
            controller: this._saveSubtree,
            inputs: {tree},
            cb: tree => {
                if (tree) {
                    this._toaster.pop("success", "Saved successfully!", "Don't forget to save your current tree as well!");
                    button.template = tree;
                    button.messages = [];
                }
            }
        });
    }

    _saveSubtree($scope, $element, close, MessageTrees, tree, $rootScope) {
        'ngInject';
        $scope.tree = tree;
        $scope.save = () => {
            MessageTrees($rootScope.bot.id).post(tree).then(
                tree => {
                    $element.modal('hide');
                    close(tree, 500);
                }, () => {
                    $element.modal('hide');
                    close(undefined, 500);
                }
            );
        };

        $scope.cancel = () => close(false, 500);
    }

}

export default MessageTreeController;