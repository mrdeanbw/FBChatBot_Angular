class SettingController {
    constructor(toaster, $state, FlashBag, Modals) {
        'ngInject';
        this._$state = $state;
        this._Modals = Modals;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
    }

    updateBotTimezone(timezone) {
        this.bot.timezone = timezone;
    }

    saveBot() {
        this.bot.patch().then(bot => {
            this.bot = bot;
            this._toaster.pop('success', "Successfully updated!");
        })
    }

    openDisableBotModal() {
        this._Modals.openModal({
            templateUrl: "bot/views/disable.modal.html",
            controller: this._disableBot,
            inputs: {bot: this.bot},
            cb: success => {
                if (success) {
                    this._FlashBag.success("Chat-Bot Disabled!", "Remember that you can reactivate the chatbot anytime easily!");
                    this._$state.go("app.bot.index");
                }
            }
        });
    };

    _disableBot($scope, close, bot, $element) {
        'ngInject';
        $scope.bot = bot;
        $scope.disable = function () {
            bot.customPOST({}, 'disable').then(
                response => {
                    $element.modal('hide');
                    close(true, 500);
                }
            );
        };
        $scope.cancel = function () {
            close(false, 500);
        };
    }
}
export default{
    templateUrl: 'dashboard/setting/settings.html',
    bindings: {subscriber: '<', bot: '<'},
    controller: SettingController
}