class SelectTreeController {
    constructor() {
        'ngInject';
        this.templates = [
            {id: 1, name: "Hello World 1"},
            {id: 2, name: "Hello World 2"}
        ];
    }

    refresh(){
        this.templates = [
            {id: 3, name: "Hello World 3"},
            {id: 5, name: "Hello World 4"}
        ];
    }

}
export default{
    templateUrl: 'dashboard/shared/select-tree/select-tree.html',
    bindings: {label: '<', model: '='},
    controller: SelectTreeController
}