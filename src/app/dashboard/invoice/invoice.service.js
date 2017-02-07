class Invoices {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('invoices', Bots.one(botId));
        }
    }
}

export default Invoices;