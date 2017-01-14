angular.module('dashboard').component('listSubscribers', {

    templateUrl: "/templates/dashboard/subscriber/list.html",

    bindings: {
        audienceTableParams: '<',
        cols: '<',
        colsList: '<',
        selected: '='
    },

    controller: function (NgTableParams, Subscribers, ModalService, toaster, $rootScope, $state) {

        var self = this;

        self.selected = [];

        var dateFilter = [
            {
                id: 'today',
                title: 'Today'
            },
            {
                id: 'yesterday',
                title: 'Yesterday'
            },
            {
                id: 'last_seven_days',
                title: 'Last 7 Days'
            },
            {
                id: 'last_thirty_days',
                title: 'Last 30 Days'
            },
            {
                id: 'this_month',
                title: 'This Month'
            },
            {
                id: 'last_month',
                title: 'Last Month'
            }
        ];
        self.colsList  = [
            {
                field: "batch_select",
                title: "",
                show: true,
            },
            {
                field: "avatar_url",
                title: "Avatar",
                show: true,
            },
            {
                field: "first_name",
                title: "First Name",
                sortable: "first_name",
                filter: { first_name: "text" },
                show: true
            },
            {
                field: "last_name",
                title: "Last Name",
                sortable: "last_name",
                filter: { last_name: "text" },
                show: true
            },
            {
                field: "gender",
                title: "gender",
                sortable: "gender",
                filter: { gender: "select" },
                filterData: [
                    {
                        id: 'male',
                        title: 'Male'
                    },
                    {
                        id: 'female',
                        title: 'Female'
                    }
                ],
                show: true
            },
            {
                field: "is_active",
                title: "Status",
                sortable: "is_active",
                filter: { is_active: "select" },
                filterData: [
                    {
                        id: 1,
                        title: 'Active'
                    },
                    {
                        id: 0,
                        title: 'Inactive'
                    }
                ],
                show: true
            },
            {
                field: "first_subscribed_at",
                title: "First Subscribed",
                sortable: "first_subscribed_at",
                filter: { first_subscribed_at: "select" },
                filterData: dateFilter,
                show: true
            },
            {
                field: "last_contacted_at",
                title: "Latest Contact",
                sortable: "last_contacted_at",
                filter: { last_contacted_at: "select" },
                filterData: dateFilter,
                show: true
            },
            {
                field: "tags",
                title: "Tags",
                show: true
            }
        ];

        self.cols = _.indexBy(self.colsList, "field");


        self.audienceTableParams = new NgTableParams(
            { sorting: { first_subscribed_at: "desc" } },
            {
                getData: function (params) {
                    return Subscribers($rootScope.page.id).getList(params.url()).then(function (data) {
                        params.total(data.meta.pagination.total);
                        return data;
                    });
                }
            }
        );


        self.isSelected = function (subscriber) {
            return self.selected.indexOf(subscriber.id) !== -1;
        };

        self.toggleSelection = function (subscriber) {
            if (self.isSelected(subscriber.id)) {
                var index = self.selected.indexOf(subscriber.id);
                self.selected.splice(index, 1);
                return;
            }
            self.selected.push(subscriber.id);
        };


        self.openBulkEditModal = function () {
            ModalService.showModal({
                templateUrl: "/templates/dashboard/subscriber/bulk-edit.html",
                controller: bulkEditSubscribersModalController,
                inputs: { subscribers: self.selected },
                container: '#TheModal',
                replace: true
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    if (result) {
                        self.selected = [];
                        toaster.pop("success", "Saved Successfully!");
                        self.audienceTableParams.reload();
                    }
                });
            });
        };


        self.showSubscriber = function (subscriber) {
            return $state.go('dashboard.subscriber.show', { subscriberId: subscriber.id });
        };
    }
});


var bulkEditSubscribersModalController = function ($scope, $element, subscribers, close, Subscribers, Tags, Sequences, $rootScope) {

    Tags.getList().then(function (tags) {
        $scope.tags = tags;
    });

    Sequences.getList().then(function (sequences) {
        $scope.sequences = sequences;
    });


    $scope.subscribers = subscribers;
    $scope.actions     = {
        tag: [],
        untag: [],
        subscribe: [],
        unsubscribe: []
    };

    $scope.save = function () {
        var data = angular.copy($scope.actions);

        data.subscribers = $scope.subscribers;

        Subscribers($rootScope.page.id).post(data).then(function () {
            $element.modal('hide');
            close(true, 500); // close, but give 500ms for bootstrap to animate
        });

    };

    $scope.cancel = function () {
        // $element.modal('hide');
        // console.log($element);
        close(false, 500); // close, but give 500ms for bootstrap to animate
    };
};
