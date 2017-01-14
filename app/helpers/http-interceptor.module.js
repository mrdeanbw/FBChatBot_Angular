var HTTPInterceptor = angular.module('HTTPInterceptor', ['Authentication', 'FlashBag', 'toaster', 'ui.router']);

HTTPInterceptor.factory('HTTPInterceptor', function ($q, $injector, FlashBag, toaster, $window, $rootScope, __ENV) {


    var xhrCreations   = 0;
    var xhrResolutions = 0;

    function isLoading() {
        return xhrResolutions < xhrCreations;
    }

    function updateLoadingStatus() {
        $rootScope.loading = isLoading();
    }


    var factory = {};

    /**
     * @return {boolean}
     */
    function isApiRoute(url) {
        return url.indexOf(__ENV.API_URL) === 0;
    }


    factory.request = function (request) {
        xhrCreations++;
        updateLoadingStatus();

        return request;
    };


    factory.requestError = function (rejection) {
        xhrResolutions++;
        updateLoadingStatus();
        return $q.reject(rejection);
    };


    factory.response = function (response) {
        xhrResolutions++;
        updateLoadingStatus();
        return response;
    };


    factory.responseError = function (rejection) {

        xhrResolutions++;
        updateLoadingStatus();
        
        if (rejection && rejection.config && isApiRoute(rejection.config.url)) {
            var defer = $q.defer();

            if (rejection.status == 404) {
                $injector.get('$state').go('404');
            }

            if (rejection.status == 500) {
                $injector.get('$state').go('500');
            }

            if (rejection.status == 422) {
                var errorFlashed = false;
                angular.forEach(rejection.data.errors, function (value, key) {
                    if (!errorFlashed) {
                        toaster.pop('error', "Validation Error", value[0]);
                        errorFlashed = true;
                    }
                });
            }

            // Unauthorized.
            if (rejection.status == 401) {
                FlashBag.add("Please login to proceed!", "warning", 5000);
                $injector.get('AuthService').logout();
                $injector.get('$state').go('login');
            }

            defer.reject(rejection);
            return defer.promise;
        }

        return rejection;

    };

    return factory;
});

HTTPInterceptor.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('HTTPInterceptor');
}]);



