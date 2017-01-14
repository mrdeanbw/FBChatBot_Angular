angular.module('dashboard').factory('MessagePreviews', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('message-previews', Pages.one(pageId));
    };
}]);