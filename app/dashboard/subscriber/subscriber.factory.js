angular.module('dashboard').factory('Subscribers', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('subscribers', Pages.one(pageId));
    };
}]);