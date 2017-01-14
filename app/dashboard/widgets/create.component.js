angular.module('dashboard').component('createWidget', {

    templateUrl: "/templates/dashboard/widgets/create.html",

    bindings: {
        widget: '=',
        sequences: '=',
    },

    controller: function (Widgets, FlashBag, $state, $stateParams, $rootScope) {
        var self = this;

        self.widget = {
            name: '',
            type: $stateParams.type,
            sequence: {},
            widget_options: {},
            message_blocks: []
        };

        switch (self.widget.type) {
            case 'button':
                self.widget.widget_options = {
                    color: 'blue',
                    size: 'standard'
                };
                break;
        }


        self.save = function () {
            return Widgets($rootScope.page.id).post(self.widget).then(function () {
                FlashBag.add("success", "Saved Successfully!");
                return $state.go("dashboard.widgets.list");
            });

        };
    }

});
