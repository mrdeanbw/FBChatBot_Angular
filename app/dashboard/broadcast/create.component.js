angular.module('dashboard').component('createBroadcast', {

    templateUrl: "/templates/dashboard/broadcast/edit.html",

    bindings: {
        broadcast: '='
    },

    controller: function ($scope, WizardHandler, Broadcasts, FlashBag, $state, $rootScope) {
        var self = this;

        self.broadcast = {
            name: '',
            date: moment().format("YYYY-MM-DD"),
            time: '',
            timezone: 'same_time',
            notification: 'regular',
            filter_groups: [],
            filter_type: 'and',
            filter_enabled: true,
            message_blocks: [],
            send_from: 9,
            send_to: 21
        };
        

        self.save = function () {
            removeParent(self.broadcast);
            Broadcasts($rootScope.page.id).post(self.broadcast).then(function () {
                FlashBag.add("success", "Saved Successfully!");
                return $state.go("dashboard.broadcast.list");
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