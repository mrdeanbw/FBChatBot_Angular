class SequenceMessageController {

    constructor($state, Modals, toaster, FlashBag) {
        'ngInject';

        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._FlashBag = FlashBag;

        if ($state.current.name === 'app.dashboard.sequence.message.create') {
            this.message = {
                name: '',
                live: false,
                conditions: {
                    wait_for: {
                        days: 1,
                        hours: 0,
                        minutes: 0
                    }
                },
                template: {
                    message: []
                }
            };
        }
    }

    save() {
        // update
        if (this.message.id) {
            return this.sequence.one('messages', message.id).customPUT(message).then(
                () => this._toaster.pop('success', 'Saved Successfully!')
            );
        }
        // create
        this.sequence.post('messages', message).then(
            () => {
                this._FlashBag.success('Created Successfully!');
                this._$state.go("app.dashboard.sequence.edit", {sequenceId: this.sequence.id})
            }
        );
    }

    isFirst() {
        return this.sequence.messages.indexOf(this.message) === 0;
    }

    openDeleteMessageModal() {
        this._Modals.openModal({
            templateUrl: 'dashboard/sequence/message/views/delete.modal.html',
            controller: this._deleteMessage,
            inputs: {sequence: this.sequence, message: this.message},
            cb: success => {
                if (success) {
                    this._FlashBag.success("Deleted Successfully");
                    this._$state.go('app.dashboard.sequence.edit', {sequenceId: this.sequence.id});
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
}

export default SequenceMessageController;
