class BroadcastCtrl {

    constructor($state, toaster, Broadcasts, AppHelpers, FlashBag, WizardHandler, $filter) {
        'ngInject';

        this._$state = $state;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._Broadcasts = Broadcasts;
        this._AppHelpers = AppHelpers;
        this._WizardHandler = WizardHandler;

        if ($state.current.name === 'app.dashboard.broadcast.create') {
            this.broadcast = {
                name: '',
                date: $filter('date')(new Date(), 'yyyy-MM-dd'),
                time: '',
                timezone: 'same_time',
                notification: 'regular',
                filter: {
                    enabled: true,
                    join_type: 'and',
                    groups: []
                },
                template: {
                    messages: []
                },
                send_from: 9,
                send_to: 21
            };
        }

        if ($state.current.name === 'app.dashboard.broadcast.index') {
            this.pending = [];
            this.processed = [];
            this.$onInit = () => {
                for (let broadcast of this.broadcasts) {
                    if (broadcast.status == 'pending') {
                        this.pending.push(broadcast);
                    } else {
                        this.processed.push(broadcast);
                    }
                }
            };
        }
    }

    save() {
        // update
        if (this.broadcast.id) {
            return this.broadcast.put({include: 'filter,messages'}).then(
                () => this._toaster.pop('success', 'Saved Successfully!')
            );
        }
        // create
        this._Broadcasts(this.bot.id).post(this.broadcast).then(
            () => {
                this._FlashBag.success('Saved Successfully');
                this._$state.go('app.dashboard.broadcast.index');
            }
        );
    }


    getCurrentStep() {
        return this._WizardHandler.wizard().currentStepNumber();
    };

    goToStep(step) {
        this._WizardHandler.wizard().goTo(step);
    };


    destroy(broadcast, broadcasts) {
        'ngInject';

        broadcast.remove().then(() => {
            this._AppHelpers.deleteFromArray(broadcasts, broadcast);
            this._toaster.pop('success', 'Deleted Successfully!');
        });
    }


}

export default BroadcastCtrl;