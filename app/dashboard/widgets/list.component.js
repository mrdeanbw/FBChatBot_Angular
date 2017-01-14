angular.module('dashboard').component('listWidgets', {

    templateUrl: "/templates/dashboard/widgets/list.html",

    bindings: {
        widgets: '<'
    },

    controller: function ($state, $timeout) {

        var self = this;
        
        self.createWidget = function (type) {
            $timeout(function () {
                $state.go('dashboard.widgets.create', { type: type });
            });
        };
    }

});
