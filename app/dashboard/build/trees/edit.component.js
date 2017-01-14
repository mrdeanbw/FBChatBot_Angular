angular.module('dashboard').component('editTree', {

    templateUrl: "/templates/dashboard/build/trees/edit.html",

    bindings: {
        tree: '=',
        data: '=',
        active: '=?',
        trees: '=',
        treeToAdd: '=',
        tempNodes: '=',
        breadcrumbs: '='
    },

    controller: function ($scope, ModalService, Trees, toaster, $timeout, $rootScope) {

        var self = this;

        self.remove = function (scope) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/message-blocks/delete-modal.html",
                controller: deleteModalController,
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        if (self.active == scope.node) {
                            self.active = undefined;
                        }
                        scope.remove();
                    }
                });
            });
        };

        self.toggle = function (scope) {
            scope.toggle();
        };

        self.edit = function (block) {
            self.active = block;
            // updateBreadcrumbs();
        };

        self.editCard = function (block) {
            self.edit(block._parent);
            $timeout(function () {
                var hashKey = block._parent.$$hashKey.replace(':', '_');
                var index   = block._parent.message_blocks.indexOf(block);
                angular.element('#carousel_' + hashKey).carousel(index);
            });
        };

        self.editButton = function (button) {
            if (button._parent.type == 'card') {
                // card
                self.edit(button._parent._parent);
            } else {
                self.edit(button._parent);
            }
            $timeout(function () {
                $("#button_" + normaliseHashKey(button.$$hashKey)).click();
            });
        };

        var templates = {
            text: {
                text: '',
                message_blocks: []
            },
            image: {
                image_url: ''
            },
            card_container: {
                message_blocks: []
            }
        };

        self.addBlock = function (type) {
            var newBlock  = angular.copy(templates[type]);
            newBlock.type = type;
            if (self.active.type == 'button') {
                self.active.template.message_blocks.push(newBlock);
                newBlock._parent = self.active.template;
            } else {
                self.active.message_blocks.push(newBlock);
                newBlock._parent = self.active;
            }
            // $timeout(function () {
            //     hierarchyMap[newBlock.$$hashKey] = self.active;
            // self.edit(newBlock);
            // });
            self.edit(newBlock);
        };

        self.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        self.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        var map = {
            'text': "Text Messages",
            "image": "Image Messages",
            'card_container': "Card Container"
        };

        self.treeOptions = {
            beforeDrop: function (e) {
                var source      = e.source.nodeScope.$modelValue;
                var destination = e.dest.nodesScope.node ? e.dest.nodesScope.node : undefined;

                if (!source.type) {
                    ModalService.showErrorModal("Buttons can only dragged into Text and Card blocks!");
                    return false;
                }

                if (!source.type || (destination && !destination.type)) {
                    ModalService.showErrorModal("Subtrees cannot be dragged/dropped!");
                    return false;
                }

                if (source.type == 'button') {
                    if (destination && (destination.type == 'text' || destination.type == 'card')) {
                        return true;
                    }
                    ModalService.showErrorModal("Buttons can only dragged into Text and Card blocks!");
                    return false;
                }
                if (source.type == 'card') {
                    if (destination && destination.type == 'card_container') {
                        return true;
                    }
                    ModalService.showErrorModal("Cards can only be dragged into card containers!");
                    return false;
                }
                if (destination && destination.type == 'button' && !destination.template.type) {
                    ModalService.showErrorModal("Buttons that have a subtree, cannot have other child blocks!");
                    return false;
                }

                if (!destination || destination.type == 'button') {
                    return true;
                }

                ModalService.showErrorModal(map[source.type] + " can only be dragged under buttons or under the root of the tree.");
                return false;
            }
        };

        self.hasChildren = function (node) {
            if (node.type == 'button') {
                return node.template && node.template.message_blocks && node.template.message_blocks.length > 0
            }

            return node.message_blocks && node.message_blocks.length > 0;
        };

        self.addTree = function () {
            if (!self.treeToAdd || !self.active || self.active.type != 'button') {
                return;
            }
            self.active.template = angular.copy(self.treeToAdd);
            self.treeToAdd       = undefined;

            self.tempNodes[self.active.$$hashKey] = [self.active.template];
        };

        // var updateBreadcrumbs = function () {
        //     self.breadcrumbs = [];
        //     var current      = self.active;
        //     while (current) {
        //         self.breadcrumbs.push(current);
        //         current = hierarchyMap[current.$$hashKey];
        //     }
        //     self.breadcrumbs.reverse();
        // };
        //
        // var getNormalizedDescription = function (block) {
        //     switch (block.type) {
        //         case 'text':
        //             return "[Text] " + block.text;
        //         case 'image':
        //             return "[Image]";
        //         case 'card_container':
        //             return "[Card Container]";
        //         case 'card':
        //             return "[Card] " + block.title;
        //         case 'button':
        //             return "[Button] " + block.title;
        //         default:
        //             return block.name;
        //     }
        // };

        self.openSubtreeModal = function (button) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/build/trees/subtree.html",
                controller: createSubtreeModalController,
                inputs: { tree: button.template },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (tree) {
                    if (tree) {
                        toaster.pop("success", "Saved successfully!");
                        self.tempNodes[button.$$hashKey] = [tree];
                        button.template                  = tree;
                        addParent(button.template);
                        Trees($rootScope.page.id).getList().then(function (trees) {
                            self.trees = trees;
                        });
                    }
                });
            });
        };

        self.duplicate = function (node) {
            if (node._parent) {
                var duplicate = angular.copy(node);
                removeParent(duplicate);
                removeId(duplicate);
                addParent(duplicate, node._parent);
                node._parent.message_blocks.push(duplicate);
            }
        };

        self.tempNodes = {};
        self.edit(self.tree);

        self.save = function () {
            removeParent(self.tree);
            return self.tree.put().then(function (tree) {
                self.active    = undefined;
                self.tree      = tree;
                self.tempNodes = {};
                buildTempNodes(self.tree);
                addParent(self.tree);
                toaster.pop("success", "Saved successfully");
            });
        };


        var buildTempNodes = function (block) {
            if (!block.message_blocks) {
                return;
            }
            angular.forEach(block.message_blocks, function (mBlock) {
                if (mBlock.type == 'button' && mBlock.template.is_explicit) {
                    self.tempNodes[mBlock.$$hashKey] = [mBlock.template];
                } else {
                    buildTempNodes(mBlock.type == 'button' ? mBlock.template : mBlock);
                }
            });
        };

        $timeout(function () {
            buildTempNodes(self.tree);
            addParent(self.tree);
        });
    }

});
