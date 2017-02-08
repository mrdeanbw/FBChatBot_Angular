class SequenceController {

    constructor($state, Modals, toaster, AppHelpers) {
        'ngInject';

        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._AppHelpers = AppHelpers;

        if ($state.current.name === 'app.dashboard.sequence.edit') {
            this.$onInit = () =>this._sequenceMessagesMeta();
        }
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

    save() {
        this.sequence.put().then(
            () => this._toaster.pop('success', 'Saved successfully!')
        );
    }

    _isFirstMessage(message) {
        return this.sequence.messages.indexOf(message) === 0;
    }

    openCreateSequenceModal() {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/create.modal.html',
            controller: this._createSequence,
            cb: sequence => {
                if (sequence) {
                    return this._$state.go('app.dashboard.sequence.edit', {sequenceId: sequence.id});
                }
            }
        });
    }

    _createSequence($scope, $element, close, $rootScope, Sequences) {
        'ngInject';
        $scope.sequence = {name: ''};
        $scope.save = () => {
            return Sequences($rootScope.bot.id).post($scope.sequence).then(
                response => {
                    $element.modal('hide');
                    close(response, 500);
                }
            );
        };
        $scope.cancel = () => close(false, 500);
    }

    openDeleteSequenceModal(sequence) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/delete.modal.html',
            controller: this._deleteSequence,
            inputs: {sequence: sequence},
            cb: success => {
                if (success) {
                    this._toaster.pop("success", "Deleted Successfully!");
                }
            }
        });
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

    openDeleteMessageModal(sequence, message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/message/views/delete.modal.html',
            controller: this._deleteMessage,
            inputs: {sequence: sequence, message: message},
            cb: success => {
                if (success) {
                    this._AppHelpers.deleteFromArray(sequence.messages, message);
                    this._toaster.pop("success", "Deleted Successfully!");
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

    openEditMessageConditionsModal(message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/message/views/edit-conditions.modal.html',
            controller: this._editMessageConditions,
            inputs: {sequence: this.sequence, message: message, isFirst: this._isFirstMessage(message)},
            cb: res => {
                if (res) {
                    let index = this.sequence.messages.indexOf(message);
                    this.sequence.messages[index] = res;
                    this._toaster.pop("success", "Saved Successfully!");
                }
            }
        });
    }

    _editMessageConditions($scope, $element, close, sequence, message, isFirst, lodash) {
        'ngInject';
        $scope.message = lodash.cloneDeep(message);
        $scope.isFirst = isFirst;
        $scope.save = function () {
            sequence.one('messages', $scope.message.id).customPUT($scope.message, 'conditions').then(
                res => {
                    $element.modal('hide');
                    close(res, 500);
                }
            );
        };
        $scope.cancel = () => close(false, 500);
    }
}

export default SequenceController;
