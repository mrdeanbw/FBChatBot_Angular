function defaultReplyRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.default-reply', {
        url: '/default-reply',
        component: 'defaultReply',
        title: 'Default Reply',
        description: 'Default Reply is sent when the bot doesn’t know what to answer (i.d. no keyword matches). Tell your users what they can ask about (what keywords you set up) or provide them with a menu by sending a message with buttons.',
        resolve: {
            bot: (Bots, $stateParams, $rootScope) => {
                'ngInject';
                return Bots.one($stateParams.botId).get({include: 'default_reply'}).then(bot => $rootScope.bot = bot);
            }
        }
    });


}


export default defaultReplyRoutes;
