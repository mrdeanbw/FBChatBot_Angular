class MessageRevisions {
    constructor(Restangular, Bots) {
        'ngInject';
        let Messages = (botId) => Restangular.service('messages', Bots.one(botId));
        return (botId, messageId) => Restangular.service('revisions', Messages(botId).one(messageId));
    }
}

export default MessageRevisions;