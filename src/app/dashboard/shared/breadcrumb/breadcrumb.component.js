class BreadcrumbController {
    constructor($state, $transitions, $stateParams) {
        'ngInject';

        this._$state = $state;
        this._$stateParams = $stateParams;

        this.$onInit = () => {
            this._updateBreadcrumb();
            $transitions.onSuccess({}, () => {
                this._updateBreadcrumb();
            });
        };
    }

    _updateBreadcrumb() {
        this.breadcrumb = [];
        let current = this._$state.$current;
        while (current && current.name && current.name !== 'app.dashboard.overview' && current.name !== 'app.dashboard') {
            let breadcrumb = current.breadcrumb || {};
            let stateName = current.abstract ? null : current.name;
            if (breadcrumb.stateName) {
                stateName = breadcrumb.stateName;
            }
            if (!this.breadcrumb.length || stateName !== this.breadcrumb[this.breadcrumb.length - 1].stateName) {
                let title = breadcrumb.title ? breadcrumb.title : current.title;
                let arr = {title, stateName};
                if (current.name === 'app.dashboard.sequence.message' || current.name === 'app.dashboard.sequence.message') {
                    arr.stateParams = {sequenceId: this._$stateParams.sequenceId};
                }
                this.breadcrumb.push(arr);
            }
            current = current.parent;
        }
        this.breadcrumb.push({title: this.page.name, stateName: 'app.dashboard.overview'});
        this.breadcrumb.reverse();
    }
}


export default{
    templateUrl: "dashboard/shared/breadcrumb/breadcrumb.html",
    bindings: {page: '<'},
    controller: BreadcrumbController
};
