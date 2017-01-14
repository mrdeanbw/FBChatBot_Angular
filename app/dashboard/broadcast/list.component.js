angular.module('dashboard').component('listBroadcasts', {

    templateUrl: "/templates/dashboard/broadcast/list.html",

    bindings: {
        broadcasts: '<'
    },

    controller: function (toaster) {
        var self = this;

        self.cancelBroadcast = function (broadcast) {
            broadcast.remove().then(function () {
                toaster.pop("success", "Deleted Successfully!");
                var index = self.broadcasts.indexOf(broadcast);
                self.broadcasts.splice(index, 1);
            });
        }
    }

});
