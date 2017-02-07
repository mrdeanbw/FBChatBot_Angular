class AutoReplyRules {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('auto-reply/rules', Bots.one(botId));
        }
    }
}

export default AutoReplyRules;