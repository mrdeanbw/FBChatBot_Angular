angular.module('dashboard').factory('WelcomeMessages', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/welcome-message', Pages.one(pageId));
    };
}]);