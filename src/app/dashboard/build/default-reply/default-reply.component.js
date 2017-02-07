class DefaultReplyController {
    constructor(toaster) {
        'ngInject';

        this._toaster = toaster;
    }

    save() {
        this.bot.customPUT(this.bot.default_reply, "default-reply").then((defaultReply)=> {
            this.bot.default_reply = defaultReply;
            this._toaster.pop("success", "Saved Successfully!");
        });
    }
}
export default{
    templateUrl: 'dashboard/build/default-reply/default-reply.html',
    bindings: {bot: '<'},
    controller: DefaultReplyController
}