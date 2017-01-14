angular.module('dashboard').factory('GreetingTexts', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/greeting-text', Pages.one(pageId));
    };
}]);