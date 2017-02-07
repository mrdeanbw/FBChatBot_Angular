class MessagePreviews {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('message-previews', Bots.one(botId));
        }
    }
}

export default MessagePreviews;