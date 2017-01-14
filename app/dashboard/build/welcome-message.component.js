angular.module('dashboard').component('welcomeMessage', {

    templateUrl: "/templates/dashboard/build/welcome-message.html",

    bindings: {
        welcomeMessage: '<'
    },

    controller: function (toaster) {

        var self = this;

        self.update = function () {
            removeParent(self.welcomeMessage);
            self.welcomeMessage.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };

    }
});
