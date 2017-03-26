class BroadcastCtrl {

    constructor($state, toaster, Broadcasts, AppHelpers, FlashBag, $filter, Modals, jstz, $scope, MessageHelpers) {
        'ngInject';

        this._MessageHelpers = MessageHelpers;

        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._Broadcasts = Broadcasts;
        this._AppHelpers = AppHelpers;

        if ($state.current.name === 'app.dashboard.broadcast.create') {
            this.broadcast = {
                name: `New Broadcast ${$filter('date')(new Date(), 'yyyy-MM-dd HH:mm')}`,
                date: $filter('date')(new Date(), 'yyyy-MM-dd'),
                time: $filter('date')(new Date(), 'HH:mm'),
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
                timezone_mode: 'bot'
            };
            this.$onInit = () => this.broadcast.timezone = this.bot.timezone;
        }

        if ($state.current.name !== 'app.dashboard.broadcast.index') {
            const userTimezone = jstz.determine();
            if (userTimezone) {
                this.userTimezone = userTimezone.name();
            }
            this.userTimezone = this.userTimezone || 'UTC';
            this.activeCount = 0;
            this.$onInit = () => {
                if (!this.broadcast.timezone) {
                    this.broadcast.timezone = undefined;
                }
                $scope.$watch(
                    () => this.broadcast.message_type,
                    () => this.updateLastInteractionAt(),
                    true
                );
            };
        }
    }

    save() {
        if (this.broadcast.send_mode === 'now') {
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
            broadcast.remove().then(() => {
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
        if (this.broadcast.timezone_mode === 'bot') {
            return this.broadcast.timezone = this.bot.timezone;
        }

        if (this.broadcast.timezone_mode === 'subscriber') {
            return this.broadcast.timezone = undefined;
        }

        if (this.broadcast.timezone_mode === 'custom' && !this.broadcast.timezone) {
            this.broadcast.timezone = this.userTimezone;
        }
    }

    targetAudienceCountChanged(count) {
        this.activeCount = count;
    }

    updateLastInteractionAt() {
        if (this.broadcast.message_type === 'promotional') {
            return this.last_interaction_at = 'last_24_hours';
        }

        if (this.broadcast.message_type === 'follow_up') {
            return this.last_interaction_at = 'not:last_24_hours';
        }

        this.last_interaction_at = undefined;
    }

    getDateObject(broadcast) {
        return new Date(broadcast.date + " " + broadcast.time);
    }

    paginatePending(page) {
        this._Broadcasts(this.bot.id).one('pending').getList('', {page}).then(pending => this.pending = pending);
    }

    paginateProcessed(page) {
        this._Broadcasts(this.bot.id).one('non-pending').getList('', {page}).then(processed => this.processed = processed);
    }

    showButtonDetails(button) {
        return this._Modals.openModal({
            templateUrl: 'dashboard/broadcast/views/button-details.modal.html',
            inputs: {button},
            controller: function ($scope, close, button, Sequences, $rootScope) {
                'ngInject';
                $scope.button = button;
                if (button.sequencesFetched) {
                    $scope.loading = false;
                } else {
                    let addSequences = angular.copy(button.actions.add_sequences);
                    let removeSequences = angular.copy(button.actions.remove_sequences);
                    let ids = addSequences.concat(removeSequences).join(',');
                    console.log(addSequences, removeSequences, ids);
                    button.actions.add_sequences = [];
                    button.actions.remove_sequences = [];
                    Sequences($rootScope.bot.id).getList({ids}).then(
                        sequences => {
                            for (let sequence of sequences) {
                                if (addSequences.includes(sequence.id)) {
                                    button.actions.add_sequences.push(sequence);
                                } else {
                                    button.actions.remove_sequences.push(sequence);
                                }
                            }
                            $scope.loading = false;
                            console.log(button.actions);
                            button.sequencesFetched = true;
                        }
                    );
                }

            }
        });
    }
}

export default BroadcastCtrl;