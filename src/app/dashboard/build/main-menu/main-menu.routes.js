function MainMenuRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.main-menu', {
        url: '/main-menu',
        component: 'mainMenu',
        title: 'Main Menu',
        description: 'The Main Menu is a persistent menu that is always available to the user. This menu should contain top-level actions that users can enact at any point.',
        resolve: {
            bot: (Bots, $stateParams, $rootScope) => {
                'ngInject';
                return Bots.one($stateParams.botId).get({include: 'main_menu'}).then(bot => $rootScope.bot = bot);
            }
        }
    });


}


export default MainMenuRoutes;
