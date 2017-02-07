class SequenceController {

    constructor($state, Modals, toaster, Sequences, AppHelpers, FlashBag) {
        'ngInject';

        this._$state     = $state;
        this._Modals     = Modals;
        this._toaster    = toaster;
        this._FlashBag   = FlashBag;
        this._Sequences  = Sequences;
        this._AppHelpers = AppHelpers;

        if ($state.current.name === 'app.dashboard.sequence.edit') {
            this._sequenceMessagesMeta();
        }

        if ($state.current.name === 'app.dashboard.sequence.message.create') {
            this.message = {
                name: '',
                is_live: false,
                days: 1,
                messages: []
            };
        }
    }

    saveMessage(sequence, message) {

        if (message.id) {
            // update
            return sequence.one('messages', message.id).customPUT(message).then(
                () => this._$state.go("app.dashboard.sequence.edit", { sequenceId: sequence.id })
            );
        }
        // create
        sequence.post('messages', message).then(
            () => this._$state.go("app.dashboard.sequence.edit", { sequenceId: this.sequence.id })
        );
    }

    isFirstMessage(sequence, message) {
        return sequence.messages.indexOf(message) === 0;
    }

    _sequenceMessagesMeta() {
        let totalPrecedingDays = 0;
        for (let message of this.sequence.messages) {
            message.total_days = totalPrecedingDays;
            if (!message.is_deleted) {
                totalPrecedingDays += message.days;
            }
        }
    }

    openCreateSequenceModal() {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/create.modal.html',
            controller: this._createSequence,
            cb: sequence => {
                if (sequence) {
                    return this._$state.go('app.dashboard.sequence.edit', { sequenceId: sequence.id });
                }
            }
        });
    }

    openDeleteSequenceModal(sequence) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/delete.modal.html',
            controller: this._deleteSequence,
            inputs: { sequence: sequence },
            cb: success => {
                if (success) {
                    this._toaster.pop("success", "Deleted Successfully!");
                }
            }
        });
    }

    openDeleteMessageModal(sequence, message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/messages/delete.modal.html',
            controller: this._deleteMessage,
            inputs: { sequence: sequence, message: message },
            cb: success => {
                if (success) {
                    if (this._$state.current.name === 'app.dashboard.sequence.edit') {
                        this._AppHelpers.deleteFromArray(sequence.messages, message);
                        this._toaster.pop("success", "Deleted Successfully!");
                    } else {
                        this._FlashBag.success("Deleted Successfully");
                        this._$state.go('app.dashboard.sequence.edit', { sequenceId: sequence.id });
                    }
                }
            }
        });
    }

    openEditMessageModal(sequence, message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/messages/edit.modal.html',
            controller: this._editMessage,
            inputs: { sequence: sequence, message: message },
            cb: success => {
                if (success) {
                    this._toaster.pop("success", "Saved Successfully!");
                }
            }
        });
    }

    _deleteMessage($scope, $element, close, sequence, message) {
        'ngInject';

        $scope.message = message;

        $scope.delete = function () {
            sequence.one('messages', message.id).customDELETE().then(() => {
                $element.modal('hide');
                close(true, 500);
            });
        };

        $scope.cancel = () => close(false, 500);
    }

    _editMessage($scope, $element, close, sequence, message) {
        'ngInject';

        $scope.message = message;

        $scope.isFirstMessage = this.isFirstMessage(sequence, message);

        $scope.save = function () {
            sequence.one('messages', $scope.message.id).customPUT($scope.message).then(
                () => {
                    $element.modal('hide');
                    close(true, 500);
                }
            );
        };

        $scope.cancel = () => close(false, 500);
    }

    _createSequence($scope, $element, close) {
        'ngInject';

        $scope.sequence = { name: '' };

        $scope.save = () => {
            return this._Sequences(this.bot.id).post($scope.sequence).then(
                response => {
                    $element.modal('hide');
                    close(response, 500);
                }
            );
        };

        $scope.cancel = () => close(false, 500);
    }

    _deleteSequence($scope, $element, close, sequence) {
        'ngInject';

        $scope.sequence = sequence;

        $scope.delete = function () {
            sequence.remove().then(() => {
                $element.modal('hide');
                close(true, 500);
            });
        };

        $scope.cancel = () => close(false, 500);
    }


}

export default SequenceController;
