angular.module('dashboard').component('editSequenceMessage', {

    templateUrl: "/templates/dashboard/sequence/message/edit.html",

    bindings: {
        sequence: '=',
        message: '='
    },

    controller: function ($state, ModalService, FlashBag) {
        var self = this;

        self.save = function () {
            removeParent(self.message);
            return self.sequence.one('messages', self.message.id).customPUT(self.message).then(function () {
                return $state.go("dashboard.sequence.edit", { sequenceId: self.sequence.id });
            });
        };

        self.delete = function () {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/sequence/message/delete-modal.html",
                controller: deleteSequenceMessageModalController,
                inputs: { sequence: self.sequence, message: self.message },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (confirmed) {
                    if (confirmed) {
                        FlashBag.add("success", "Deleted Successfully!");
                        return $state.go("dashboard.sequence.edit", { sequenceId: self.sequence.id });
                    }
                });
            });
        };

        self.isFirstMessage = function () {
            return self.sequence.messages.length === 0;
        };
    }

});
