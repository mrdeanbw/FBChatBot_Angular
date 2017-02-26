class Broadcasts {
    constructor(Restangular, Bots) {
        'ngInject';

        return botId => Restangular.service('broadcasts', Bots.one(botId));
    }
}

export default Broadcasts;