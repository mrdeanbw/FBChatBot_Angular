angular.module('dashboard').factory('MainMenus', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/main-menu', Pages.one(pageId));
    };
}]);