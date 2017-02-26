class Invoices {
    constructor(Restangular, Bots) {
        'ngInject';

        return botId => Restangular.service('invoices', Bots.one(botId));
    }
}

export default Invoices;