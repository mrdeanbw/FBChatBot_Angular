angular.module('dashboard').factory('DefaultReplies', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/default-reply', Pages.one(pageId));
    };
}]);