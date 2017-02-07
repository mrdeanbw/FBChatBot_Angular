class PageHeaderController {
    constructor($transitions, $state) {
        'ngInject';
        this.title = $state.current.title;
        this.description = $state.current.description;
        $transitions.onSuccess({}, () => {
            this.title = $state.current.title;
            this.description = $state.current.description;
        });
    }
}
export default{
    templateUrl: "dashboard/shared/page-header/page-header.html",
    controller: PageHeaderController
};
