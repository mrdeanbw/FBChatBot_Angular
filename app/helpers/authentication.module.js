var Authentication = angular.module('Authentication', ['ngStorage']);

Authentication.factory('AuthService', ['$localStorage', 'Restangular', '$http', '__ENV', function ($localStorage, Restangular, $http, __ENV) {
    var factory = {};

    function storeToken(token) {
        $localStorage.auth_token = token;
    }

    function removeToken() {
        delete $localStorage.auth_token;
    }

    factory.isAuthenticated = function () {
        return $localStorage.auth_token && $localStorage.auth_token.length;
    };

    factory.getToken = function () {
        return $localStorage.auth_token;
    };

    // @todo replace with restangular unauthorized interceptor https://gist.github.com/germanolleunlp/e3e80113626d8c5520b7
    factory.refreshToken = function () {
        return $http({
            url: __ENV.API_URL + '/auth/token',
            skipAuthorization: true,
            method: 'GET',
            headers: { Authorization: 'Bearer ' + factory.getToken() }
        }).then(function (response) {
            storeToken(response.data.data.token);
        }, function () {
            removeToken();
        });
    };

    factory.storeToken = function (token) {
        return storeToken(token);
    };

    factory.login = function (FacebookToken) {
        return Restangular.all('auth').post({ token: FacebookToken }).then(function (response) {
            storeToken(response.token);
            return response.token;
        });
    };

    factory.logout = function () {
        removeToken();
    };

    return factory;
}]);