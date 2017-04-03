class SubscriberController {

    constructor(NgTableParams, Subscribers, Modals, toaster, AppHelpers, $state, lodash, Sequences) {
        'ngInject';

        this._lodash = lodash;
        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._Sequences = Sequences;
        this._AppHelpers = AppHelpers;
        this._Subscribers = Subscribers;
        this._NgTableParams = NgTableParams;

        if (this._$state.current.name === 'app.dashboard.subscriber.index') {
            this.selected = [];
            this._initSubscriberTable();
        }
    }

    isSelected(subscriber) {
        return this.selected.includes(subscriber);
    }

    toggleSelection(subscriber) {
        if (this.isSelected(subscriber)) {
            return this._AppHelpers.deleteFromArray(this.selected, subscriber);
        }
        this.selected.push(subscriber);
    }

    showSubscriber(subscriber) {
        this._$state.go('app.dashboard.subscriber.show', {subscriberId: subscriber.id});
    };

    openBulkEditModal() {
        this._Modals.openModal({
            templateUrl: 'dashboard/subscriber/views/bulk-edit.modal.html',
            controller: this._bulkEdit,
            inputs: {subscribers: this.selected},
            cb: success => {
                if (success) {
                    self.selected = [];
                    this._toaster.pop("success", "Saved Successfully!");
                    this.tableParams.reload();
                }
            }
        })
    }

    save() {
        this.subscriber.patch(this.subscriber, {include: 'sequences,history'}).then(
            subscriber => {
                this.subscriber = subscriber;
                this._toaster.pop("success", "Saved Successfully!")
            }
        );
    }

    _bulkEdit($scope, close, $element, $rootScope, subscribers) {
        'ngInject';

        $scope.tags = $rootScope.bot.tags;

        $scope.subscribers = subscribers;

        $scope.add_tags = [];
        $scope.remove_tags = [];

        $scope.save = () => {
            let data = {
                add_tags: $scope.add_tags,
                remove_tags: $scope.remove_tags,
                subscribers: $scope.subscribers
            };

            if (!data.add_tags && !data.remove_tags) {
                close(true, 500);
                return;
            }

            $rootScope.bot.all('subscribers').customPATCH(data).then(() => {
                $element.modal('hide');
                close(true, 500);
            });
        };

        $scope.cancel = function () {
            close(false, 500);
        };
    }

    _initSubscriberTable() {

        let dateFilter = [
            {id: 'today', title: 'Today'},
            {id: 'yesterday', title: 'Yesterday'},
            {id: 'last_seven_days', title: 'Last 7 Days'},
            {id: 'last_thirty_days', title: 'Last 30 Days'},
            {id: 'this_month', title: 'This Month'},
            {id: 'last_month', title: 'Last Month'}
        ];

        this.colList = [
            {field: "batch_select", title: "", show: true,},
            {field: "avatar_url", title: "Avatar", show: true},
            {
                field: "first_name",
                title: "First Name",
                sortable: "first_name",
                filter: {first_name: "text"},
                show: true
            },
            {field: "last_name", title: "Last Name", sortable: "last_name", filter: {last_name: "text"}, show: true},
            {
                field: "gender",
                title: "gender",
                sortable: "gender",
                filter: {gender: "select"},
                filterData: [{id: 'male', title: 'Male'}, {id: 'female', title: 'Female'}],
                show: true
            },
            {
                field: "active",
                title: "Status",
                sortable: "active",
                filter: {active: "select"},
                filterData: [{id: 1, title: 'Active'}, {id: 0, title: 'Inactive'}],
                show: true
            },
            {
                field: "created_at",
                title: "Joined",
                sortable: "created_at",
                filter: {created_at: "select"},
                filterData: dateFilter,
                show: true
            },
            {
                field: "last_interaction_at",
                title: "Latest Contact",
                sortable: "last_interaction_at",
                filter: {last_interaction_at: "select"},
                filterData: dateFilter,
                show: true
            },
            {field: "tags", title: "Tags", show: true}
        ];

        this.cols = this._lodash.keyBy(this.colList, "field");

        this.tableParams = new this._NgTableParams(
            {sorting: {created_at: "desc"}},
            {
                getData: params => {
                    return this._Subscribers(this.bot.id).getList(params.url()).then(
                        data => {
                            params.total(data.meta.pagination.total);
                            return data;
                        }
                    );
                }
            }
        );
    }
}

export default SubscriberController;
