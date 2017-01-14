angular.module('dashboard').component('createSequenceMessage', {

    templateUrl: "/templates/dashboard/sequence/message/create.html",

    bindings: {
        sequence: '=',
        message: '='
    },

    controller: function ($state) {
        var self = this;

        self.message = {
            name: '',
            is_live: false,
            days: 1,
            message_blocks: []
        };

        self.save = function () {
            removeParent(self.message);
            return self.sequence.post('messages', self.message).then(function () {
                return $state.go("dashboard.sequence.edit", { sequenceId: self.sequence.id });
            });
        };
        
        self.isFirstMessage = function () {
            return self.sequence.messages.length === 0;
        };
    }

});
