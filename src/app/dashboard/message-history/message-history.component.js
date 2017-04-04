class MessageHistoryController {
    constructor($window, Modals, $stateParams) {
        'ngInject';

        this._Modals = Modals;
        this._$window = $window;
        this.mainMenuButton = !!$stateParams.mainMenuButton;

        this.summary = {stats: {}};

        if (this.mainMenuButton) {
            this.summary.stats = {
                clicked: {total: 0, per_subscriber: 0}
            };
        } else {
            this.summary.stats = {
                sent: {total: 0, per_subscriber: 0},
                delivered: {total: 0, per_subscriber: 0},
                read: {total: 0, per_subscriber: 0},
            };
        }

        this.$onInit = () => {
            for (let i = 0; i < this.revisions.length; i++) {
                let current = this.revisions[i];
                if (this.mainMenuButton) {
                    this.summary.stats.clicked.total += current.stats.clicked.total;
                    this.summary.stats.clicked.per_subscriber += current.stats.clicked.per_subscriber;
                } else {
                    this.summary.stats.sent.total += current.stats.sent.total;
                    this.summary.stats.sent.per_subscriber += current.stats.sent.per_subscriber;
                    this.summary.stats.delivered.total += current.stats.delivered.total;
                    this.summary.stats.delivered.per_subscriber += current.stats.delivered.per_subscriber;
                    this.summary.stats.read.total += current.stats.read.total;
                    this.summary.stats.read.per_subscriber += current.stats.read.per_subscriber;
                }
                if (i === this.revisions.length - 1) {
                    continue;
                }
                let previous = this.revisions[i + 1];

                if (this.mainMenuButton){
                    current.change = {
                        clicked: {
                            total: (current.stats.clicked.total - previous.stats.clicked.total) / previous.stats.clicked.total,
                            per_subscriber: (current.stats.clicked.per_subscriber - previous.stats.clicked.per_subscriber) / previous.stats.clicked.per_subscriber
                        }
                    }
                } else {
                    current.change = {
                        sent: {
                            total: (current.stats.sent.total - previous.stats.sent.total) / previous.stats.sent.total,
                            per_subscriber: (current.stats.sent.per_subscriber - previous.stats.sent.per_subscriber) / previous.stats.sent.per_subscriber
                        },
                        delivered: {
                            total: (current.stats.delivered.total - previous.stats.delivered.total) / previous.stats.delivered.total,
                            per_subscriber: (current.stats.delivered.per_subscriber - previous.stats.delivered.per_subscriber) / previous.stats.delivered.per_subscriber
                        },
                        read: {
                            total: (current.stats.read.total - previous.stats.read.total) / previous.stats.read.total,
                            per_subscriber: (current.stats.read.per_subscriber - previous.stats.read.per_subscriber) / previous.stats.read.per_subscriber
                        }
                    }
                }
            }
            // this.active = this.summary;
            this.active = this.revisions[0];
        };
    }

    getFractionClass(ratio) {
        if (isNaN(ratio)) {
            return 'na';
        }

        if (!ratio) {
            return 'zero';
        }

        if (ratio < 0) {
            return 'negative';
        }

        return 'positive';
    }


    showButtonDetails(button) {
        return this._Modals.openModal({
            templateUrl: 'dashboard/broadcast/views/button-details.modal.html',
            inputs: {button},
            controller: function ($scope, close, button, Sequences, $rootScope) {
                'ngInject';
                $scope.button = button;
                // if (button.sequencesFetched) {
                //     $scope.loading = false;
                // } else {
                //     let addSequences = angular.copy(button.actions.add_sequences);
                //     let removeSequences = angular.copy(button.actions.remove_sequences);
                //     let ids = addSequences.concat(removeSequences).join(',');
                //     button.actions.add_sequences = [];
                //     button.actions.remove_sequences = [];
                //     Sequences($rootScope.bot.id).getList({ids}).then(
                //         sequences => {
                //             for (let sequence of sequences) {
                //                 if (addSequences.includes(sequence.id)) {
                //                     button.actions.add_sequences.push(sequence);
                //                 } else {
                //                     button.actions.remove_sequences.push(sequence);
                //                 }
                //             }
                //             $scope.loading = false;
                //             button.sequencesFetched = true;
                //         }
                //     );
                // }

            }
        });
    }

    closeWindow() {
        this._$window.close();
    }
}

export default{
    templateUrl: 'dashboard/message-history/message-history.html',
    bindings: {revisions: '<'},
    controller: MessageHistoryController
}
