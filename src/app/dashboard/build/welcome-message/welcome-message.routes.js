function WelcomeMessageRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.welcome-message', {
        url: '/welcome-message',
        component: 'welcomeMessage',
        title: 'Welcome Message',
        description: 'Here you can set up a Welcome Message to greet your subscribers. Tell your subscribers what to expect: what is your bot about, how often do you post and anything else that you think is important. Only people that click a button or send you a message become subscribers – so make it engaging!',
        resolve: {
            bot: (Bots, $stateParams, $rootScope) => {
                'ngInject';
                return Bots.one($stateParams.botId).get({include: 'welcome_message'}).then(bot => $rootScope.bot = bot);
            }
        }
    });


}


export default WelcomeMessageRoutes;
