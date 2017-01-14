angular.module('auth').component('disabledBots', {

    templateUrl: "/templates/auth/disabled-bots.html",

    bindings: { bots: '=', activeBots: '=' },

    controller: function ($state, FlashBag, ModalService) {
        var self = this;

        self.openEnableBotModal = function (page) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/settings/enable-modal.html",
                controller: enableBotModalController,
                inputs: { page: page },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    if (result) {
                        FlashBag.add("success", "Chat-Bot Enabled!", "Your chat-bot has been enabled.");
                        $state.go("dashboard.overview", { facebookId: result.facebookId })
                    }
                });
            });
        };

    }

});


var enableBotModalController = function ($scope, $element, page, close) {
    $scope.page = page;

    $scope.enable = function () {
        $scope.page.patch({ is_active: true }).then(function (response) {
            $element.modal('hide');
            close(response, 500);
        });
    };

    $scope.cancel = function () {
        close(false, 500);
    };
};

