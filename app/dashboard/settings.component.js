angular.module('dashboard').component('settings', {

    templateUrl: "/templates/dashboard/settings/main.html",

    bindings: {
        timezones: '<',
        timezone: '=',
        subscriptionPlans: '<',
        newSubscriptionPlan: '='
    },

    controller: function (Pages, $rootScope, $state, FlashBag, toaster, __ENV, ModalService, $stateParams, $timeout) {

        var self = this;

        angular.forEach(self.subscriptionPlans, function (plan) {
            if (!self.newSubscriptionPlan && plan.subscribers >= $rootScope.page.subscriber_count) {
                self.newSubscriptionPlan = plan;
            }
        });

        self.setBotTimezone = function (timezone) {
            if (self.timezones.indexOf(timezone) == -1) {
                return;
            }
            var data = {
                'bot_timezone_string': timezone,
                'bot_timezone': moment.tz(timezone).utcOffset() / 60
            };
            $rootScope.page.patch(data).then(function (page) {
                toaster.pop("success", "Saved Successfully!");
                $rootScope.page = page;
            });
        };

        self.openDisableBotModal = function () {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/settings/disable-modal.html",
                controller: disableBotModalController,
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    if (result) {
                        FlashBag.add("warning", "Chat-Bot Disabled!", "Your chat-bot has been disabled.");
                        $state.go("create-bot")
                    }
                });
            });
        };
        
        self.openInvoicesModal = function () {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/invoices/list-modal.html",
                controller: invoicesModalController,
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
            });
        };

        if (!$rootScope.page.payment_plan) {
            var handler = StripeCheckout.configure({
                key: __ENV.STRIPE_PUBLIC_KEY,
                image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: 'auto',
                token: function (token) {
                    $rootScope.page.customPOST({ stripeToken: token.id }, 'subscription').then(function () {
                        handler.close();
                        FlashBag.add("success", "Subscribed successfully!", "You have been successfully subscribed to our PRO plan! Enjoy!");
                        return $state.reload();
                    })
                }
            });

            self.showPaymentForm = function () {
                handler.open({
                    name: 'Mr.Reply',
                    description: 'Pro Plan - Monthly Subscription',
                    amount: self.newSubscriptionPlan.price
                });
            };

            $(window).on('popstate', function () {
                handler.close();
            });

            if ($stateParams.upgrade) {
                $timeout(function () {
                    $("#upgradeToProModal").modal('show');
                })
            }
        }
    }

});


var invoicesModalController = function ($scope, $element, Invoices, close, $rootScope) {
    $scope.invoices = [];
    Invoices($rootScope.page.id).getList().then(function (tags) {
        $scope.invoices = tags;
    });
    $scope.cancel = function () {
        close(false, 500);
    };
};


var disableBotModalController = function ($scope, $element, close, $rootScope) {
    $scope.disable = function () {
        $rootScope.page.remove().then(function () {
            $element.modal('hide');
            close(true, 500);
        });
    };
    $scope.cancel  = function () {
        close(false, 500);
    };
};

