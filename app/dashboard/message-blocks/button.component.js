var buttonModalController = function ($scope, $element, messageBlock, $rootScope, context, close, Tags, Trees, Sequences, allowSendTrees) {

    $scope.messageBlock = messageBlock;
    $scope.context      = context;
    $scope.sendTrees    = allowSendTrees || false;


    $scope.refreshTrees = function () {
        Trees($rootScope.page.id).getList().then(function (trees) {
            $scope.trees = trees;
        });
    };

    Tags($rootScope.page.id).getList().then(function (tags) {
        $scope.tags = tags;
    });

    $scope.refreshTrees();

    //  This close function doesn't need to use jQuery or bootstrap, because
    //  the button has the 'data-dismiss' attribute.
    $scope.save = function () {
        close($scope.messageBlock, 500); // close, but give 500ms for bootstrap to animate
    };

    //  This cancel function must use the bootstrap, 'modal' function because
    //  the doesn't have the 'data-dismiss' attribute.
    $scope.cancel = function () {
        close({ 'action': 'remove' }, 500); // close, but give 500ms for bootstrap to animate
    };
};


angular.module('dashboard').component('buttonBlock', {
    templateUrl: '/templates/dashboard/message-blocks/button.html',
    bindings: {
        messageBlock: '=',
        context: '=',
        allowSendTrees: '<'
    },
    controller: function (ModalService) {
        var self = this;

        self.remove = function () {
            var index = self.context.message_blocks.indexOf(self.messageBlock);
            if (index !== -1) {
                self.context.message_blocks.splice(index, 1);
            }
        };

        self.openButtonModal = function () {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/message-blocks/button-modal.html",
                controller: buttonModalController,
                inputs: {
                    messageBlock: self.messageBlock,
                    context: self.context,
                    allowSendTrees: self.allowSendTrees
                },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    if (result.action == 'remove') {
                        self.remove();
                    } else {
                        self.messageBlock = result;
                    }
                });
            });
        };
    }
});
