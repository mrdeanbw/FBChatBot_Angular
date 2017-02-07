class Broadcasts {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('broadcasts', Bots.one(botId));
        }
    }
}

export default Broadcasts;