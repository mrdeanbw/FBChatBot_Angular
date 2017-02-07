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
            this.tree = {name: 'New Message Tree', messages: []};
        }

        this.$onInit = () => {
            this.active = this.tree;
            this.treeOptions = {
                beforeDrop: (e) => {
                    console.log(e);
                    return true;
                }
            };
        }
    }

    save() {

        if (this.tree.id) {
            this.tree.put().then((template) => {
                this.tree = template;
                this.active = this.tree;
                this._toaster.pop('success', 'Saved Successfully!');
            })
        }

        this._MessageTrees(this.bot.id).post(this.tree).then(() => {
            this._FlashBag.add("success", "Saved successfully!");
            this._$state.go("dashboard.build.tree.list");
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
        this._clearIDs(message);
        this._getContainer(scope, message).push(duplicate);
    }

    _getParent(scope, node) {
        while (scope && scope.node == node) scope = scope.$parent;
        return scope.node ? scope.node : this.tree;
    }

    _getContainer(scope, node) {
        let container = this._getParent(scope, node);
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
        this._lodash.unset(message, '*.id');
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
        let cardContainer = this._getParent(scope, card);
        this.edit(cardContainer);
        this._$timeout(() => {
            let hashkey = this._$filter('normalizedHashkey')(cardContainer.$$hashKey);
            let index = cardContainer.cards.indexOf(card);
            angular.element('#carousel_' + hashkey).carousel(index);
        });
    }

    editButton(button, scope) {
        let parent = this._getParent(scope, button);

        if (parent.type == 'card') {
            this.edit(this._getParent(scope, parent));
        } else {
            this.edit(parent);
        }
        this._MessageHelpers.openButtonModal(parent.buttons, button);
    }

    remove(scope) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/delete.modal.html',
            controller: this._confirmDeleteModal,
            cb: confirmed => {
                if (confirmed) {
                    if (this.active == scope.node) {
                        this.active = undefined;
                    }
                    scope.remove();
                }
            }
        });
    }

    addTextMessage(container) {
        let message = {type: 'text', text: '', buttons: []};
        this._MessageHelpers.addMessage(container, message);
        this.edit(message);
    }

    addImage(container) {
        let message = {type: 'image', image_url: ''};
        this._MessageHelpers.addMessage(container);
        this.edit(message);
    }

    addCardContainer(container) {
        let message = {type: 'card_container', cards: []};
        this._MessageHelpers.addMessage(container, message);
        this.edit(message);
    }


    _confirmDeleteModal($scope, close) {
        'ngInject';
        $scope.delete = () => close(true, 500);
        $scope.cancel = () => close(false, 500);
    }

}

export default MessageTreeController;