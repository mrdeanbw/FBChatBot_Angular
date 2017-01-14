angular.module('dashboard').component('cardContainerBlock', {
    templateUrl: '/templates/dashboard/message-blocks/card-container.html',
    bindings: {
        messageBlock: '=',
        MAX_CARD_COUNT: '<'
    },
    controller: function ($timeout) {
        var self = this;

        self.MAX_CARD_COUNT = 5;

        self.addCard = function () {
            self.messageBlock.message_blocks.push({
                title: '',
                type: 'card',
                subtitle: '',
                url: '',
                image_url: '',
                message_blocks:[],
                _parent: self.messageBlock
            });

            $timeout(function () {
                var hashKey = normaliseHashKey(self.messageBlock.$$hashKey);
                angular.element('#carousel_' + hashKey).carousel(self.messageBlock.message_blocks.length - 1)
            });
        };

        // angular.forEach(self.messageBlock.message_blocks, function(child){
        //     child._parent = self.messageBlock;
        // });
    }
});
