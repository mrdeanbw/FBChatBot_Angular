angular.module('dashboard').component('editBroadcast', {

    templateUrl: "/templates/dashboard/broadcast/edit.html",

    bindings: {
        broadcast: '='
    },

    controller: function ($scope, WizardHandler, toaster) {
        var self = this;
        
        self.save = function () {
            removeParent(self.broadcast);
            self.broadcast.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };

        self.getCurrentStep = function () {
            return WizardHandler.wizard().currentStepNumber();
        };

        self.goToStep = function (step) {
            WizardHandler.wizard().goTo(step);
        };
    }

});