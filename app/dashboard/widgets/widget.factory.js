angular.module('dashboard').factory('Widgets', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('widgets', Pages.one(pageId));
    };
}]);