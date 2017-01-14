angular.module('dashboard').factory('AutoReplyRules', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/ai-response/rules', Pages.one(pageId));
    };
}]);