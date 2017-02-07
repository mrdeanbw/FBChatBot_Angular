class Pages {
    constructor(Restangular) {
        'ngInject';
        return Restangular.service('pages');
    }
}

export default Pages;