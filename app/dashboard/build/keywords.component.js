angular.module('dashboard').component('keywords', {

    templateUrl: "/templates/dashboard/build/keywords/index.html",

    bindings: {
        rules: '=?',
        templates: '<',
        trees: '<',
        name: '=?'
    },

    controller: function (AutoReplyRules, $state, $timeout, $rootScope, toaster, ModalService ) {

        var self = this;

        self.addEmptyRule = function () {
            var rule = {
                'mode': 'is',
                'keyword': '',
                'action': 'send'
            };
            self.rules.push(rule);

            $timeout(function () {
                var scrollPosition = $("#" + normaliseHashKey(rule.$$hashKey)).offset().top;
                $('body').animate({
                    scrollTop: scrollPosition

                }, 'slow');
            });
        };

        var removeRuleFromArray = function (rule) {
            var index = self.rules.indexOf(rule);
            self.rules.splice(index, 1);
            toaster.pop("success", "Deleted Successfully!");
        };


        self.removeRule = function (rule) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/build/keywords/delete-modal.html",
                controller: deleteKeywordModalController,
                inputs: { rule: rule },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        removeRuleFromArray(rule);
                    }
                });
            });
        };

        self.saveRule = function (rule) {
            if (!rule.id) {
                return AutoReplyRules($rootScope.page.id).post(rule).then(function (data) {
                    self.rules[self.rules.indexOf(rule)] = data;
                    toaster.pop("success", "Saved Successfully!");
                });
            }
            return rule.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };
    }

});

var deleteKeywordModalController = function ($scope, close, rule) {
    $scope.delete = function () {
        if (!rule.id) {
            return close(true, 500);
        }
        rule.remove().then(function () {
            return close(true, 500);
        });
    };
    $scope.cancel = function () {
        close(false, 500);
    };
};