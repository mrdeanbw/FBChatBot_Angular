angular.module('dashboard').component('sidebarView', {

    templateUrl: "/templates/dashboard/partials/sidebar.html",

    bindings: {
        'pages': '<',
        'state': '<',
        'currentPage': '<'
    },

    controller: function (Pages, $state) {
        var self   = this;
        self.state = $state;
        self.pages = [];
        Pages.getList().then(function (data) {
            self.pages = data;
        });
    }

});
