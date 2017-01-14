angular.module('dashboard').component('defaultReply', {

    templateUrl: "/templates/dashboard/build/default-reply.html",

    bindings: {
        defaultReply: '<'
    },

    controller: function (toaster) {
        var self = this;

        self.update = function () {
            removeParent(self.defaultReply);
            self.defaultReply.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };
    }

});

