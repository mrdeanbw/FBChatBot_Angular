angular.module('dashboard').component('editWidget', {

    templateUrl: "/templates/dashboard/widgets/edit.html",

    bindings: {
        widget: '=',
        sequences: '='
    },

    controller: function (toaster) {
        var self = this;

        self.update = function () {
            return self.widget.put().then(function () {
                toaster.pop("success", "Saved successfully!");
            });
        };
    }

});
