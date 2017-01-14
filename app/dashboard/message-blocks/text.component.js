angular.module('dashboard').component('textBlock', {
    templateUrl: '/templates/dashboard/message-blocks/text.html',
    bindings: {
        MAX_LENGTH: '<',
        MAX_BUTTON_COUNT: '<',
        messageBlock: '=',
        allowSendTrees: '<'
    },
    controller: function ($timeout) {
        var self              = this;
        self.MAX_LENGTH       = 320;
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

        // angular.forEach(self.messageBlock.message_blocks, function(child){
        //     child._parent = self.messageBlock;
        // });

    }
});
