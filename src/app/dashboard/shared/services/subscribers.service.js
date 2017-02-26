class Subscribers {
    constructor(Restangular, Bots) {
        'ngInject';
        
        return botId => Restangular.service('subscribers', Bots.one(botId));
    }
}

export default Subscribers;