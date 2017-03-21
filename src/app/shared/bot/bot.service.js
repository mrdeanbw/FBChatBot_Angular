class Bots {
    constructor(Restangular) {
        'ngInject';
        return Restangular.service('bots/enabled');
    }
}

export default Bots;