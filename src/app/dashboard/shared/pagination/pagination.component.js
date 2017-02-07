class PaginationController {
    constructor() {
        this.maxSize = 5;
        this.currentPage = 1;
    }
}

export default {
    templateUrl: 'dashboard/shared/pagination/pagination.html',
    bindings: {pageChangedCallback: '&', context: '<'},
    controller: PaginationController
};
