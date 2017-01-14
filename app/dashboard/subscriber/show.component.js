angular.module('dashboard').component('showSubscriber', {

    templateUrl: "/templates/dashboard/subscriber/show.html",

    bindings: {
        subscriber: '=',
        sequences: '=',
        tags: '='
    },

    controller: function (toaster) {
        var self = this;

        self.save = function () {
            self.subscriber.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        }
    }
});
