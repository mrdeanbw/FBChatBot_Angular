angular.module('dashboard').component('breadcrumb', {

    templateUrl: "/templates/dashboard/partials/breadcrumb.html",

    bindings: {
        breadcrumbs: '@'
    },

    controller: function ($state, $transitions, $rootScope) {

        var self = this;

        self.breadcrumbs = [];

        var updateBreadCrumbs = function () {
            self.breadcrumbs = [];
            var state        = $state.$current;
            var previous     = null;
            while (state && state.name && state.name != 'dashboard') {
                if (state.breadcrumbTitle && (!state.breadcrumbState || state.breadcrumbState != previous)) {
                    var url = '';
                    if (state.breadcrumbState) {
                        url = state.breadcrumbState;
                    } else if (!state.abstract) {
                        url = state.name;
                    }
                    self.breadcrumbs.push({
                        title: state.breadcrumbTitle,
                        url: url
                    });
                }
                previous = state.name;
                state    = state.parent;
            }
            self.breadcrumbs.push({
                title: $rootScope.page.name,
                url: 'dashboard.overview'
            });
            self.breadcrumbs.reverse();
        };


        updateBreadCrumbs();

        $transitions.onSuccess({}, function () {
            updateBreadCrumbs();
        });


    }

});
