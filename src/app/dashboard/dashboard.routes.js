function BotRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard', {
        url: '/:botId/dashboard',
        abstract: true,
        component: 'dashboardComponent',
        params: {botId: null},
        resolve: {
            auth: (UserService) => {
                'ngInject';
                return UserService.ensureAuthIs(true);
            },
            bots: (Bots) => {
                'ngInject';
                return Bots.getList();
            },
            bot: ($stateParams, Bots, $state, $rootScope) => {
                'ngInject';
                if (!$stateParams.botId) {
                    return $state.go('app.bot.index');
                }
                return Bots.one($stateParams.botId).get().then(bot => $rootScope.bot = bot);
            }
        }
    });

}


export default BotRoutes;
