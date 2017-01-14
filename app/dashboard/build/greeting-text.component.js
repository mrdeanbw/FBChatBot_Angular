angular.module('dashboard').component('greetingText', {

    templateUrl: "/templates/dashboard/build/greeting-text.html",

    bindings: {
        greetingText: '=',
        isValid: '<'
    },

    controller: function (toaster, $rootScope) {

        var self     = this;
        self.isValid = true;

        self.update = function () {
            self.greetingText.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };

        self.validateCopyrights = function () {
            self.isValid = $rootScope.page.payment_plan || self.greetingText.text.trim().endsWith("- Powered By: MrReply.com");
        };

        self.fix = function () {
            if (!self.isValid) {
                self.greetingText.text = self.greetingText.text.replace(/- Powered By: MrReply.com/g, '');
                self.greetingText.text += "- Powered By: MrReply.com";
                var start = Math.max(0, self.greetingText.text.length - 160);
                self.greetingText.text = self.greetingText.text.substr(start);
                self.validateCopyrights();
            }
        };

        self.validateCopyrights();

    }
});
