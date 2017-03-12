class SettingController {
    constructor(toaster) {
        'ngInject';
        this._toaster = toaster;
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
}
export default{
    templateUrl: 'dashboard/setting/settings.html',
    bindings: {subscriber: '<', bot: '<'},
    controller: SettingController
}