class BroadcastCtrl {

    constructor($state, toaster, Broadcasts, AppHelpers, FlashBag, WizardHandler, $filter, Modals, jstz) {
        'ngInject';

        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._Broadcasts = Broadcasts;
        this._AppHelpers = AppHelpers;
        this._WizardHandler = WizardHandler;

        if ($state.current.name === 'app.dashboard.broadcast.create') {
            this.broadcast = {
                name: `New Broadcast ${$filter('date')(new Date(), 'yyyy-MM-dd HH:mm')}`,
                date: $filter('date')(new Date(), 'yyyy-MM-dd'),
                time: '',
                notification: 'REGULAR',
                filter: {
                    enabled: true,
                    join_type: 'and',
                    groups: []
                },
                template: {
                    messages: [{type: 'text', text: '', buttons: []}]
                },
                message_type: 'subscription',
                send_mode: 'now',
                timezone: 'UTC',
                timezone_mode: 'bot',
                limit_time: {
                    enabled: false,
                    from: 9,
                    to: 21
                }
            };
            this.$onInit = () => this.broadcast.timezone = this.bot.timezone;
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
        } else {
            const userTimezone = jstz.determine();
            if (userTimezone) {
                this.userTimezone = userTimezone.name();
            }
            this.userTimezone = this.userTimezone || 'UTC';
            this.activeCount = 0;
        }
    }

    save() {
        if (this.broadcast.send_mode == 'now') {
            return this._Modals.openModal({
                templateUrl: 'dashboard/broadcast/views/send-now.modal.html',
                inputs: {count: this.activeCount},
                controller: function ($scope, close, count) {
                    'ngInject';
                    $scope.count = count;
                    $scope.confirm = () => close(true, 500);
                },
                cb: confirmed => {
                    if (confirmed) this._save();
                }
            });
        }

        this._save();
    }

    _save() {
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

    openCancelModal(broadcast) {
        this._Modals.openModal({
            templateUrl: 'dashboard/broadcast/views/delete.modal.html',
            controller: this._confirmDeleteModal,
            inputs: {broadcast},
            cb: deleted => {
                if (deleted) {
                    this._toaster.pop('success', 'Broadcast Cancelled!');
                    this._AppHelpers.deleteFromArray(this.pending, broadcast);
                }
            }
        });
    }

    _confirmDeleteModal($scope, close, broadcast) {
        'ngInject';

        $scope.broadcast = broadcast;

        $scope.delete = () => {
            broadcast.remove().then(()=> {
                close(true, 500);
            });
        };

        $scope.cancel = () => close(false, 500);
    }

    setTimezone(timezone) {
        this.broadcast.timezone = timezone;
    }

    useUserTimezone() {
        this.broadcast.timezone = this.userTimezone;
        this.broadcast.timezone_mode = 'custom';
    }

    timezoneModeChanged() {
        if (this.broadcast.timezone_mode == 'bot') {
            return this.broadcast.timezone = this.bot.timezone;
        }

        if (this.broadcast.timezone_mode == 'subscriber') {
            return this.broadcast.timezone = undefined;
        }

        if (this.broadcast.timezone_mode == 'custom' && !this.broadcast.timezone) {
            this.broadcast.timezone = this.userTimezone;
        }
    }

    targetAudienceCountChanged(count) {
        this.activeCount = count;
    }
}

export default BroadcastCtrl;