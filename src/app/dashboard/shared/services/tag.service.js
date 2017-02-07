class Tags {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('tags', Bots.one(botId));
        }
    }
}

export default Tags;