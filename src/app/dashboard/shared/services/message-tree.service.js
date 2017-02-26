class MessageTrees {
    constructor(Restangular, Bots) {
        'ngInject';
        return botId => Restangular.service('templates/explicit', Bots.one(botId));
    }
}

export default MessageTrees;