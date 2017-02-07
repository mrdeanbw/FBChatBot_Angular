class Subscribers {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('subscribers', Bots.one(botId));
        }
    }
}

export default Subscribers;