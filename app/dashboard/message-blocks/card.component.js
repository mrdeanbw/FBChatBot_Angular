angular.module('dashboard').component('cardBlock', {
    templateUrl: '/templates/dashboard/message-blocks/card.html',
    bindings: {
        MAX_TITLE_LENGTH: '<',
        MAX_SUBTITLE_LENGTH: '<',
        MAX_BUTTON_COUNT: '<',
        messageBlock: '=',
        context: '=',
        allowSendTrees: '='
    },

    controller: function ($timeout) {
        var self              = this;
        self.MAX_TITLE_LENGTH = self.MAX_SUBTITLE_LENGTH = 80;
        self.MAX_BUTTON_COUNT = 3;

        self.addButton = function () {
            var button = {
                title: 'New Button',
                type: 'button',
                url: '',
                tag: [],
                untag: [],
                _parent: self.messageBlock
            };

            self.messageBlock.message_blocks.push(button);

            $timeout(function () {
                $("#button_" + normaliseHashKey(button.$$hashKey)).click();
            });

        };

        self.remove = function () {
            var index = self.context.message_blocks.indexOf(self.messageBlock);
            if (index !== -1) {
                self.context.message_blocks.splice(index, 1);
            }
        };

        self.isFirst = function () {
            return self.context.message_blocks.indexOf(self.messageBlock) === 0;
        };

        self.isLast = function () {
            return self.context.message_blocks.indexOf(self.messageBlock) === self.context.message_blocks.length - 1;
        };

        self.moveRight = function () {
            if (self.isLast() || self.messageBlock.is_disabled) {
                return;
            }
            var index = self.context.message_blocks.indexOf(self.messageBlock);
            swapArrayElements(self.context.message_blocks, index, index + 1);
        };

        self.moveLeft = function () {
            if (self.isFirst() || self.messageBlock.is_disabled) {
                return;
            }
            var index = self.context.message_blocks.indexOf(self.messageBlock);
            swapArrayElements(self.context.message_blocks, index, index - 1);
        };

        // angular.forEach(self.messageBlock.message_blocks, function (child) {
        //     child._parent = self.messageBlock;
        // });
    }
});
