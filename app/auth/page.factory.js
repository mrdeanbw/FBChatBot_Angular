angular.module('auth').factory('Pages', ['Restangular', function (Restangular) {
    return Restangular.service('pages');
}]);