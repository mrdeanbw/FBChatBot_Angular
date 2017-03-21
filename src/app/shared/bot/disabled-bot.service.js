class DisabledBots {
    constructor(Restangular) {
        'ngInject';
        return Restangular.service('bots/disabled');
    }
}

export default DisabledBots;
