class Sequences {
    constructor(Restangular, Bots) {
        'ngInject';

        return botId => Restangular.service('sequences', Bots.one(botId));
    }
}

export default Sequences;