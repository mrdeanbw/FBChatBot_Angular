angular.module('dashboard').factory('Sequences', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('sequences', Pages.one(pageId));
    };
}]);



var deleteSequenceMessageModalController = function ($scope, $element, close, sequence, message) {
    $scope.message = message;
    $scope.delete = function () {
        sequence.one('messages', message.id).customDELETE().then(function () {
            $element.modal('hide');
            close(true, 500);
        });
    };
    $scope.cancel = function () {
        close(false, 500);
    };
};
