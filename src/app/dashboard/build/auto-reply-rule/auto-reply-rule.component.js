class AutoReplyRuleController {
    constructor(toaster, AutoReplyRules, Modals, AppHelpers, $timeout, $filter) {
        'ngInject';

        this._Modals = Modals;
        this._toaster = toaster;
        this._$filter = $filter;
        this._$timeout = $timeout;
        this._AppHelpers = AppHelpers;
        this._AutoReplyRules = AutoReplyRules;
    }

    createRule() {
        let rule = {
            mode: 'is',
            keyword: '',
            readonly: false,
            action: 'send',
            template: {}
        };
        this.rules.push(rule);

        this._$timeout(() => $('body').animate({scrollTop: $("#" + this._$filter('normalizedHashkey')(rule.$$hashKey)).offset().top}, 'slow'));
    }

    saveRule(rule) {
        if (rule.id) {
            return this._updateRule(rule);
        }
        this._storeRule(rule);
    }

    _storeRule(rule) {
        return this._AutoReplyRules(this.bot.id).post(rule).then((data) => {
            this.rules[this.rules.indexOf(rule)] = data;
            this._toaster.pop("success", "Saved Successfully!");
        });
    }

    _updateRule(rule) {
        rule.put().then(() => this._toaster.pop("success", "Saved Successfully!"));
    }


    openDeleteRuleModal(rule) {
        this._Modals.openModal({
            templateUrl: 'dashboard/build/keyword/views/delete.modal.html',
            controller: this._confirmDeleteModal,
            inputs: {rule},
            cb: deleted => {
                if (deleted) {
                    this._AppHelpers.deleteFromArray(this.rules, rule);
                }
            }
        });
    }

    _confirmDeleteModal($scope, close, rule) {
        'ngInject';

        $scope.delete = () => {
            if (!rule.id) {
                return close(true, 500);
            }
            return rule.remove().then(() => close(true, 500));
        };
        $scope.cancel = () => close(false, 500);
    }

    paginate(page) {
        this._AutoReplyRules(this.bot.id).getList({keyword: this.filter, page}).then((rules)=> this.rules = rules);
    }

}
export default{
    templateUrl: 'dashboard/build/auto-reply-rule/views/auto-reply-rule.html',
    bindings: {rules: '<', bot: '<'},
    controller: AutoReplyRuleController
}