class WelcomeMessageControlelr {
    constructor(toaster) {
        'ngInject';

        this._toaster = toaster;
    }

    save() {
        this.bot.customPUT(this.bot.welcome_message, "welcome-message").then(welcomeMessage=> {
            this.bot.welcome_message = welcomeMessage;
            this._toaster.pop("success", "Saved Successfully!");
        });
    }
}
export default{
    templateUrl: 'dashboard/build/welcome-message/welcome-message.html',
    bindings: {bot: '<'},
    controller: WelcomeMessageControlelr
}