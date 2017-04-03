class SelectTagsController {
    constructor($rootScope, toaster) {
        'ngInject';
        this._toaster = toaster;
        this._$rootScope = $rootScope;
    }

    persistTag($item) {
        if (!this._$rootScope.bot.tags.includes($item)) {
            this._$rootScope.bot.all('tags').post({tag: $item}).then(res => {
                this._toaster.pop('success', 'Tag created.');
                this._$rootScope.bot.tags = res.tags;
            });
        }
    }
}

export default{
    templateUrl: 'dashboard/shared/select-tags/select-tags.html',
    bindings: {label: '<', model: '='},
    controller: SelectTagsController
}