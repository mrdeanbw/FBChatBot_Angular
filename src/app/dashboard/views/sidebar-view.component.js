class SidebarController {
    constructor($state) {
        'ngInject';
        
        this._$state = $state;
    }
}
export default {
    templateUrl: "dashboard/views/sidebar-view.html",
    bindings: {'bots': '<'},
    controller: SidebarController
};
