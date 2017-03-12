class SequenceController {

    constructor($state, Modals, toaster, AppHelpers, lodash, Sequences) {
        'ngInject';

        this._$state     = $state;
        this._Modals     = Modals;
        this._lodash     = lodash;
        this._toaster    = toaster;
        this._Sequences = Sequences;
        this._AppHelpers = AppHelpers;


        if ($state.current.name === 'app.dashboard.sequence.edit') {
            this.$onInit = () =>this._sequenceMessagesMeta();
        }
    }

    _sequenceMessagesMeta() {

        let totalWait = {
            days: 0,
            hours: 0,
            minutes: 0
        };

        for (let message of this.sequence.messages) {

            if (message.is_deleted){
                continue;
            }

            totalWait.days += message.conditions.wait_for.days;
            totalWait.hours += message.conditions.wait_for.hours;
            totalWait.minutes += message.conditions.wait_for.minutes;
            totalWait.hours += Math.floor(totalWait.minutes / 60);
            totalWait.minutes = totalWait.minutes % 60;
            totalWait.days += Math.floor(totalWait.hours / 24);
            totalWait.hours   = totalWait.hours % 24;

            message.total_wait = this._lodash.cloneDeep(totalWait);
        }
    }

    save() {
        this.sequence.put({ include: 'messages,filter' }).then(
            sequence => {
                this.sequence = sequence;
                this._sequenceMessagesMeta();
                this._toaster.pop('success', 'Saved successfully!')
            }
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
                    this._toaster.pop('success', 'Saved successfully!');
                    return this._$state.go('app.dashboard.sequence.edit', { sequenceId: sequence.id });
                }
            }
        });
    }

    _createSequence($scope, $element, close, $rootScope, Sequences) {
        'ngInject';
        $scope.sequence = { name: '' };
        $scope.save     = () => {
            return Sequences($rootScope.bot.id).post($scope.sequence).then(
                response => {
                    $element.modal('hide');
                    close(response, 500);
                }
            );
        };
        $scope.cancel   = () => close(false, 500);
    }

    openDeleteSequenceModal(sequence) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/views/delete.modal.html',
            controller: this._deleteSequence,
            inputs: { sequence: sequence },
            cb: deleted => {
                if (deleted) {
                    this._AppHelpers.deleteFromArray(this.sequences, sequence);
                    this._toaster.pop("success", "Deleted Successfully!");
                }
            }
        });
    }

    _deleteSequence($scope, $element, close, sequence) {
        'ngInject';
        $scope.sequence = sequence;
        $scope.delete   = function () {
            sequence.remove().then(() => {
                $element.modal('hide');
                close(true, 500);
            });
        };
        $scope.cancel   = () => close(false, 500);
    }

    openDeleteMessageModal(message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/message/views/delete.modal.html',
            controller: this._deleteMessage,
            inputs: { sequence: this.sequence, message },
            cb: deletedMessage => {
                if (deletedMessage !== false) {
                    // soft deleted
                    if (deletedMessage) {
                        let index = this.sequence.messages.indexOf(message);
                        this.sequence.messages[index] = deletedMessage;
                    } else {
                        this._AppHelpers.deleteFromArray(this.sequence.messages, message);
                    }
                    this._sequenceMessagesMeta();
                    this._toaster.pop("success", "Deleted Successfully!");
                }
            }
        });
    }

    _deleteMessage($scope, $element, close, sequence, message) {
        'ngInject';
        $scope.message = message;
        $scope.delete  = function () {
            sequence.one('messages', message.id).customDELETE().then(message => {
                $element.modal('hide');
                close(message, 500);
            });
        };
        $scope.cancel  = () => close(false, 500);
    }

    openEditMessageConditionsModal(message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/message/views/edit-conditions.modal.html',
            controller: this._editMessageConditions,
            inputs: { sequence: this.sequence, message: message, isFirst: this._isFirstMessage(message) },
            cb: res => {
                if (res) {
                    let index                     = this.sequence.messages.indexOf(message);
                    this.sequence.messages[index] = res;
                    this._sequenceMessagesMeta();
                    this._toaster.pop("success", "Saved Successfully!");
                }
            }
        });
    }

    _editMessageConditions($scope, $element, close, sequence, message, isFirst, lodash) {
        'ngInject';
        $scope.message = lodash.cloneDeep(message);
        $scope.isFirst = isFirst;
        $scope.save    = function () {
            sequence.one('messages', $scope.message.id).customPUT($scope.message, 'conditions').then(
                res => {
                    $element.modal('hide');
                    close(res, 500);
                }
            );
        };
        $scope.cancel  = () => close(false, 500);
    }

    paginate(page) {
        this._Sequences(this.bot.id).getList({name: this.filter, page}).then((sequences)=> this.sequences = sequences);
    }

}

export default SequenceController;
