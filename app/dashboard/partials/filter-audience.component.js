angular.module('dashboard').component('filterAudience', {

    templateUrl: "/templates/dashboard/partials/filter-audience.html",

    bindings: {
        context: '=?',
        tags: '=?',
        sequences: '=?',
        allowedRuleTypes: '=?',
        count: '=?',
        enableTargetingControl: '<'
    },

    controller: function ($scope, Tags, Sequences, Subscribers, $rootScope) {
        var self = this;

        if (self.enableTargetingControl === undefined) {
            self.enableTargetingControl = true;
        }
        self.tags = [];

        var handleChange = function () {
            var filter = {
                is_active: 1,
                filter_groups: self.context.filter_groups,
                filter_type: self.context.filter_type,
                filter_enabled: self.context.filter_enabled
            };
            Subscribers($rootScope.page.id).getList({ count: 1, filter: filter }).then(function (data) {
                self.count = data.meta.pagination.total;
            });
        };

        $scope.$watch(function () {
            return self.context.filter_groups;
        }, handleChange, true);

        $scope.$watch(function () {
            return self.context.filter_type;
        }, handleChange, true);

        $scope.$watch(function () {
            return self.context.filter_enabled;
        }, handleChange, true);

        self.allowedRuleTypes = self.allowedRuleTypes || ['gender', 'tag', 'sequence'];

        Tags($rootScope.page.id).getList().then(function (tags) {
            self.tags = tags;
        });

        Sequences($rootScope.page.id).getList().then(function (sequences) {
            self.sequences = sequences;
        });

        self.addGroup = function () {
            self.context.filter_groups.push(
                {
                    type: 'and',
                    rules: []
                }
            );
        };

        self.addRule = function (group) {
            group.rules.push(
                {
                    key: 'gender'
                }
            );
        };

        self.removeRule = function (groupRules, rule) {
            var index = groupRules.indexOf(rule);
            groupRules.splice(index, 1);
        };

        self.removeGroup = function (group) {
            var index = self.context.filter_groups.indexOf(group);
            self.context.filter_groups.splice(index, 1);
        };

    }

});
