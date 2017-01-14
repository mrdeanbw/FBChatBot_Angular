angular.module('dashboard').component('pageHeader', {

    templateUrl: "/templates/dashboard/partials/page-header.html",

    bindings: {
        pageTitle: '@',
        pageDescription: '@'
    },

    controller: function ($transitions, $state) {

        var self = this;

        var state            = $state;
        self.pageTitle       = state.$current.pageTitle;
        self.pageDescription = state.$current.pageDescription;

        $transitions.onSuccess({}, function () {
            self.pageTitle       = state.$current.pageTitle;
            self.pageDescription = state.$current.pageDescription;
        });

    }

});
