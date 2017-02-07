class SelectTagsController {
    constructor($rootScope) {
        'ngInject';
        this.tags = $rootScope.bot.tags;
    }
}

export default{
    templateUrl: 'dashboard/shared/select-tags/select-tags.html',
    bindings: {label: '<', model: '='},
    controller: SelectTagsController
}