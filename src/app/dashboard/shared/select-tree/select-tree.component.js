class SelectTreeController {
    constructor(MessageTrees, $rootScope) {
        'ngInject';
        this._$rootScope = $rootScope;
        this._MessageTrees = MessageTrees;

        this.refresh();
    }

    refresh() {
        this._MessageTrees(this._$rootScope.bot.id).getList().then(trees=> this.trees = trees);
    }

}
export default{
    templateUrl: 'dashboard/shared/select-tree/select-tree.html',
    bindings: {label: '<', model: '='},
    controller: SelectTreeController
}