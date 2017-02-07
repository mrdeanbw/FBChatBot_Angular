function BotRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.subscriber', {
            url: '/audience',
            abstract: true,
            title: 'Audience',
            breadcrumbState: 'app.dashboard.subscriber.index',
            templateUrl: 'dashboard/subscriber/html/layout.html',
        })

        .state('app.dashboard.subscriber.index', {
            url: '/',
            title: 'Audience',
            templateUrl: 'dashboard/subscriber/html/index.html',
            controller: 'SubscriberController as $ctrl',
            description: 'Easier than finding a needle in the haystack',
            breadcrumbState: 'dashboard.subscriber.list',
        })


        .state('app.dashboard.subscriber.show', {
            url: '/:subscriberId',
            title: 'Subscriber Profile',
            templateUrl: 'dashboard/subscriber/html/index.html',
            controller: 'SubscriberController as $ctrl',
            description: 'More detailed information about your subscriber.',
            breadcrumbState: 'dashboard.subscriber.list',
            resolve: {
                subscriber: (Subscribers, $stateParams, bot) => {
                    'ngInject';
                    return Subscribers(bot.id).one($stateParams.subscriberId).get();
                },
                sequences: (Sequences) => {
                    'ngInject';
                    return Sequences(bot.id).getList();
                },
                tags: function (Tags) {
                    'ngInject';
                    return Tags(bot.id).getList();
                }
            }
        });

}


export default BotRoutes;
