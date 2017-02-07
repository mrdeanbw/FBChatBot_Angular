class BreadcrumbController {
    constructor($state, $transitions) {
        'ngInject';

        this._$state = $state;

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
        while (current && current.name && current.name != 'app.dashboard.overview' && current.name != 'app.dashboard') {
            let url = current.abstract ? null : current.name;
            this.breadcrumb.push({title: current.title, url});
            current = current.parent;
        }
        this.breadcrumb.push({title: this.page.name, url: 'app.dashboard.overview'});
        this.breadcrumb.reverse();
    }
}


export default{
    templateUrl: "dashboard/shared/breadcrumb/breadcrumb.html",
    bindings: {page: '<'},
    controller: BreadcrumbController
};
