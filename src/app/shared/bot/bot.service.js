class Bots {
    constructor(Restangular) {
        'ngInject';
        return Restangular.service('bots');
    }
}

export default Bots;