angular.module('dashboard').factory('Broadcasts', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('broadcasts', Pages.one(pageId));
    };
}]);