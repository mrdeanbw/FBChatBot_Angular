function GreetingTextRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.greeting-text', {
        url: '/greeting-text',
        component: 'greetingText',
        title: 'Greeting Text',
        description: 'Here you can set up your greeting text. Display a friendly message and encourage them to get engaged with your page!',
        resolve: {
            bot: (Bots, $stateParams, $rootScope) => {
                'ngInject';
                return Bots.one($stateParams.botId).get({include: 'greeting_text'}).then(bot => $rootScope.bot = bot);
            }
        }
    });


}


export default GreetingTextRoutes;
