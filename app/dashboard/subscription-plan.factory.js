angular.module('auth').factory('SubscriptionPlans', ['Restangular', function (Restangular) {
    return Restangular.service('subscription-plans');
}]);