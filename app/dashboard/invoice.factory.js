angular.module('dashboard').factory('Invoices', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('invoices', Pages.one(pageId));
    };
}]);