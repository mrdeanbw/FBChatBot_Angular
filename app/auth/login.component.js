angular.module('auth').component('login', {

    templateUrl: "/templates/auth/login.html",

    controller: ['$location', 'toaster', '$facebook', 'AuthService', '$state', function ($location, toaster, $facebook, AuthService, $state) {

        var self = this;

        self.isUnderMaintenance = function () {
            return window.__ENV.MAINTENANCE_ENABLED;
        };

        self.login = function () {

            if (self.isUnderMaintenance()) {
                return;
            }

            $facebook.login().then(function (response) {
                if (response.status === 'connected') {
                    return AuthService.login(response.authResponse.accessToken).then(function () {
                        return $state.go('dashboard.overview');
                    });
                }
                if (response.status === 'not_authorized') {
                    return toaster.pop('error', "Login Failed!", "Facebook Authorization has failed!");
                }
                toaster.pop('warning', "Login Required!", "Please login into Facebook to continue.!");
            });
        };
    }]
});
