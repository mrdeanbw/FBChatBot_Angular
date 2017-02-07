class Sequences {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('sequences', Bots.one(botId));
        }
    }
}

export default Sequences;