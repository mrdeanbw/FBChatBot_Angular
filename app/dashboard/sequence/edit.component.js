angular.module('dashboard').component('editSequence', {

    templateUrl: "/templates/dashboard/sequence/edit.html",

    bindings: {
        sequence: '='
    },

    controller: function (toaster, ModalService) {
        var self = this;

        var day = 0;
        angular.forEach(self.sequence.messages, function (message) {
            message.total_days = day + message.days;
            if (!message.is_deleted) {
                day += message.days;
            }
        });

        self.deleteMessage = function (sequence, message) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/message/delete-modal.html",
                controller: deleteSequenceMessageModalController,
                inputs: { sequence: sequence, message: message },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        var index = sequence.messages.indexOf(message);
                        sequence.splice(index, 1);
                        toaster.pop("success", "Deleted Successfully!");
                    }
                });
            });
        };
        

        self.save = function () {
            self.sequence.put().then(function () {
                toaster.pop("success", "Saved Successfully!");
            });
        };

        self.openWaitForModal = function (sequence, message) {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/wait-for-modal.html",
                controller: waitForModalSequence,
                inputs: { sequence: sequence, message: message },
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

    }

});


var waitForModalSequence = function ($scope, $element, close, sequence, message) {
    var originalDays = message.days;

    $scope.message = message;

    $scope.isFirstMessage = sequence.messages.indexOf(message) === 0;

    $scope.save = function () {
        sequence.one('messages', $scope.message.id).customPUT($scope.message).then(function () {
            $element.modal('hide');
            close(true, 500);
        });
    };

    $scope.cancel = function () {
        message.days = originalDays;
        close(false, 500);
    };
};