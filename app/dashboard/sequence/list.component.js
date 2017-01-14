angular.module('dashboard').component('listSequences', {

    templateUrl: "/templates/dashboard/sequence/list.html",

    bindings: {
        sequences: '<',
        newSequence: '='
    },

    controller: function (Sequences, toaster, ModalService, $state) {

        var self = this;

        self.newSequence = { name: '' };

        self.create = function (sequence) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/create-modal.html",
                controller: createSequenceModalController,
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (sequence) {
                    if (sequence) {
                        return $state.go("dashboard.sequence.edit", { sequenceId: sequence.id });
                    }
                });
            });
        };


        self.edit = function (sequence) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/edit-modal.html",
                controller: editSequenceModalController,
                inputs: { sequence: sequence },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (sequence) {
                    if (sequence) {
                        toaster.pop("success", "Saved Successfully!");
                    }
                });
            });
        };


        self.delete = function (sequence) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/delete-modal.html",
                controller: deleteSequenceModalController,
                inputs: { sequence: sequence },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        toaster.pop("success", "Deleted Successfully!");
                    }
                });
            });
        }
    }

});


var createSequenceModalController = function ($scope, $element, close, Sequences, $rootScope) {
    $scope.sequence = { name: '' };
    $scope.save     = function () {
        return Sequences($rootScope.page.id).post($scope.sequence).then(function (response) {
            $element.modal('hide');
            close(response, 500);
        });
    };
    $scope.cancel   = function () {
        close(false, 500);
    };
};


var editSequenceModalController = function ($scope, $element, close, sequence) {
    var originalName = sequence.name;

    $scope.sequence = sequence;

    $scope.save = function () {
        $scope.sequence.put().then(function () {
            $element.modal('hide');
            close(true, 500);
        });
    };

    $scope.cancel = function () {
        sequence.name = originalName;
        close(false, 500);
    };
};


var deleteSequenceModalController = function ($scope, $element, close, sequence) {
    $scope.sequence = sequence;

    $scope.delete = function () {
        sequence.remove().then(function () {
            $element.modal('hide');
            close(true, 500);
        });
    };
    $scope.cancel = function () {
        close(false, 500);
    };
};
