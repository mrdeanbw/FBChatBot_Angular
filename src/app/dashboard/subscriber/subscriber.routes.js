function BotRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.subscriber', {
            url: '/audience',
            abstract: true,
            title: 'Audience',
            templateUrl: 'dashboard/subscriber/views/layout.html'
        })

        .state('app.dashboard.subscriber.index', {
            url: '/',
            title: 'Audience',
            component: 'subscriberList',
            description: 'Easier than finding a needle in the haystack'
        })


        .state('app.dashboard.subscriber.show', {
            url: '/:subscriberId',
            title: 'Subscriber Profile',
            component: 'showSubscriber',
            description: 'More detailed information about your subscriber.',
            resolve: {
                subscriber: (Subscribers, $stateParams, bot) => {
                    'ngInject';
                    return Subscribers(bot.id).one($stateParams.subscriberId).get({include: 'history,sequences'});
                }
            }
        });

}


export default BotRoutes;
