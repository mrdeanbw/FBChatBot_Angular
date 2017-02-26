class AutoReplyRules {
    constructor(Restangular, Bots) {
        'ngInject';

        return botId => Restangular.service('auto-reply/rules', Bots.one(botId));
    }
}

export default AutoReplyRules;