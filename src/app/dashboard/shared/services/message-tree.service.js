class MessageTrees {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('templates/explicit', Bots.one(botId));
        }
    }
}

export default MessageTrees;