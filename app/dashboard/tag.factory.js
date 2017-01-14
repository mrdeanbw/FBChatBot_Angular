angular.module('dashboard').factory('Tags', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('tags', Pages.one(pageId));
    };
}]);