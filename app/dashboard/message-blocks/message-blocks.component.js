angular.module('dashboard').component('messageBlocks', {

    templateUrl: "/templates/dashboard/message-blocks/message-blocks.html",

    bindings: {
        'allowedBlocks': '=?',
        'maxBlocks': '=?',
        'createMode': '<',
        'blockText': '@',
        'context': '=?',
        'noPreview': '@',
        'newBlocksCols': '@',
        'page': '=?',
        'templates': '<',
        'userStatus': '=?',
        'allowPreview': '=?'
    },

    controller: function (ModalService, Pages, $rootScope, toaster, MessagePreviews) {

        var self = this;

        // self.userStatus


        var updateUserStatus = function () {
            Pages.one($rootScope.page.id).customGET("user-status").then(function (response) {
                self.userStatus = response;
            });
        };

        updateUserStatus();

        self.blockText = {
            text: 'Text Block',
            card_container: 'Card Block',
            image: 'Image Block',
            button: 'Button'
        };

        self.allowedBlocks = self.allowedBlocks || ['text', 'image', 'card_container'];

        self.maxBlocks     = self.maxBlocks || 10;
        self.newBlocksCols = self.newBlocksCols || 12;
        if (self.allowPreview === undefined) {
            self.allowPreview = true;
        }

        self.templates = {
            text: {
                text: '',
                message_blocks: []
            },
            image: {
                image_url: ''
            },
            card_container: {
                message_blocks: []
            },
            button: {
                title: 'New Button',
                url: '',
                send: {},
                tag: [],
                untag: []
            }
        };


        self.addBlock = function (type) {
            if (self.context.message_blocks.length >= self.maxBlocks) {
                return;
            }
            var newMessageBlock  = angular.copy(self.templates[type]);
            newMessageBlock.type = type;
            self.context.message_blocks.push(newMessageBlock);

            var index         = self.context.message_blocks.length - 1;
            var disabledIndex = index - 1;
            while (disabledIndex >= 0 && self.context.message_blocks[disabledIndex].is_disabled) {
                swapArrayElements(self.context.message_blocks, index, disabledIndex);
                index         = disabledIndex;
                disabledIndex = index - 1;
            }
        };

        self.canMoveNext = function (block) {
            var index = self.context.message_blocks.indexOf(block);
            return (!block.is_disabled && index + 1 < self.context.message_blocks.length && !self.context.message_blocks[index + 1].is_disabled);
        };

        self.canMovePrevious = function (block) {
            var index = self.context.message_blocks.indexOf(block);
            return (!block.is_disabled && index - 1 >= 0 && !self.context.message_blocks[index - 1].is_disabled);
        };

        self.moveNext = function (block) {
            if (!self.canMoveNext(block)) {
                return;
            }
            var index = self.context.message_blocks.indexOf(block);
            swapArrayElements(self.context.message_blocks, index, index + 1);
        };

        self.movePrevious = function (block) {
            if (!self.canMovePrevious(block)) {
                return;
            }
            var index = self.context.message_blocks.indexOf(block);
            swapArrayElements(self.context.message_blocks, index, index - 1);
        };

        self.removable = function (block) {
            var index = self.context.message_blocks.indexOf(block);
            return (index !== -1 && !block.is_disabled);
        };

        self.remove = function (block) {
            if (!self.removable(block)) {
                return;
            }
            ModalService.showModal({
                templateUrl: "/templates/dashboard/message-blocks/delete-modal.html",
                controller: deleteModalController,
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        var index = self.context.message_blocks.indexOf(block);
                        self.context.message_blocks.splice(index, 1);
                    }
                });
            });
        };


        var openPreviewModal = function (userStatus) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/message-blocks/preview-modal.html",
                controller: previewModalController,
                inputs: { context: self.context, userStatus: userStatus },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    updateUserStatus();
                    if (result) {
                        toaster.pop("success", "Sent Successfully!", "Preview Message has been successfully sent. Check your Messenger. This message was sent to you only!");
                    }
                });
            });
        };

        self.preview = function () {
            if (self.userStatus === undefined || !self.allowPreview) {
                return;
            }

            if (self.userStatus.is_subscribed) {
                var copy = angular.copy(self.context);
                removeParent(copy);
                MessagePreviews($rootScope.page.id).post(copy).then(function () {
                    toaster.pop("success", "Sent Successfully!", "Preview Message has been successfully sent. Check your Messenger. This message was sent to you only!");
                });
                return;
            }

            openPreviewModal(self.userStatus);
        };
    }
});
