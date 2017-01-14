angular.module('dashboard').factory('BotService', ['$q', '$http', '$stateParams', function ($q, $http, $stateParams) {

    var bot;

    function fetchBot() {
        if (angular.isDefined(bot)) return $q.when(bot);

        return $http.get('/api/bots/' + $stateParams.botId).success(function (data) {
            bot = data;
        });
    }

    var factory = {};

    factory.getPage = function () {
        return fetchBot().then(function () {
            return bot.page;
        });
    };

    return factory;
    
}]);