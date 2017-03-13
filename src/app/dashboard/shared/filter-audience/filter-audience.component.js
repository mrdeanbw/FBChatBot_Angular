class FilterAudienceController {

    constructor($rootScope, AppHelpers, Sequences, $scope, Subscribers) {
        'ngInject';
        this._AppHelpers = AppHelpers;
        this._$rootScope = $rootScope;
        this._Subscribers = Subscribers;

        this.$onInit = () => {
            this.allowedFilters = this.allowedFilters || ['gender', 'tag', 'sequence'];

            if (this.allowedFilters.includes('tag')) {
                this.tags = $rootScope.bot.tags;
            }

            if (this.allowedFilters.includes('sequence')) {
                Sequences($rootScope.bot.id).getList().then(sequences => this.sequences = sequences);
            }

            if (this.enableControl === undefined) {
                this.enableControl = true;
            }

            $scope.$watch(() => this.model, () => this._updateCount(), true);
        }
    }

    addGroup() {
        this.model.groups.push(
            {
                join_type: 'and',
                rules: []
            }
        );
    }

    addRule(group) {
        group.rules.push(
            {
                key: 'gender',
                value: 'male'
            }
        );
    }

    remove(element, container) {
        this._AppHelpers.deleteFromArray(container, element);
    };

    _updateCount() {
        let params = {count: 1, filter: {filter: this.model}};
        this._Subscribers(this._$rootScope.bot.id).getList(params).then(data => {
            this.count = data.meta.pagination.total;
            if (this.targetAudienceChanged){
                this.targetAudienceChanged({count: this.count});
            }
        });
    }
}

export default{
    templateUrl: 'dashboard/shared/filter-audience/filter-audience.html',
    bindings: {enableControl: '<', model: '=', allowedFilters: '<', targetAudienceChanged: '&'},
    controller: FilterAudienceController
}