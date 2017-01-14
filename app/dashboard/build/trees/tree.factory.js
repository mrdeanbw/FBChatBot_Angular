angular.module('dashboard').factory('Trees', ['Restangular', 'Pages', function (Restangular, Pages) {
    return function (pageId) {
        return Restangular.service('build/trees', Pages.one(pageId));
    };
}]);

var createSubtreeModalController = function ($scope, $element, close, Trees, tree, $rootScope) {
    $scope.tree = tree;

    $scope.save = function () {
        removeParent($scope.tree);
        return Trees($rootScope.page.id).post($scope.tree).then(function (response) {
            $element.modal('hide');
            close(response, 500);
        }, function () {
            $element.modal('hide');
            close(undefined, 500);
        });
    };

    $scope.cancel = function () {
        close(false, 500);
    };
};