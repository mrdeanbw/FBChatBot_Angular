class GreetingTextController {
    constructor(toaster) {
        'ngInject';

        this._toaster = toaster;

        this.isValid = true;
        this.$onInit = () => this.validateCopyrights();
    }

    save() {
        this.bot.customPUT(this.bot.greeting_text, "greeting-text").then((greetingText)=> {
            this.bot.greeting_text = greetingText;
            this._toaster.pop("success", "Saved Successfully!");
        });
    }

    validateCopyrights() {  
        this.isValid = this.bot.payment_plan || this.bot.greeting_text.text.trim().endsWith("- Powered By: MrReply.com");
    };

    fix() {
        if (this.isValid) {
            return;
        }
        this.bot.greeting_text.text = this.bot.greeting_text.text.replace(/- Powered By: MrReply.com/g, '');
        this.bot.greeting_text.text += "- Powered By: MrReply.com";
        var start = Math.max(0, this.bot.greeting_text.text.length - 160);
        this.bot.greeting_text.text = this.bot.greeting_text.text.substr(start);
        this.validateCopyrights();
    };

}
export default{
    templateUrl: 'dashboard/build/greeting-text/greeting-text.html',
    bindings: {bot: '<'},
    controller: GreetingTextController
}