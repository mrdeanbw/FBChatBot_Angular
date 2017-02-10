function BroadcastRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.broadcast', {
            url: '/broadcasts',
            abstract: true,
            title: 'Broadcasts',
            breadcrumbState: 'app.dashboard.broadcast.index',
            templateUrl: 'dashboard/broadcast/views/layout.html'
        })

        .state('app.dashboard.broadcast.index', {
            url: '/',
            title: 'Broadcasts',
            component: 'broadcastList',
            description: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            resolve: {
                broadcasts: (Broadcasts, bot) => {
                    'ngInject';
                    return Broadcasts(bot.id).getList();
                }
            }
        })

        .state('app.dashboard.broadcast.create', {
            url: "/create",
            title: 'New broadcast',
            description: 'Configure your template message blocks and a descriptive name so that you can find it easily!',
            component: 'createBroadcast'
        })

        .state('app.dashboard.broadcast.edit', {
            url: "/:broadcastId/edit",
            title: 'Edit your broadcast',
            description: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            component: 'editBroadcast',
            resolve: {
                broadcast: (Broadcasts, $stateParams, bot) => {
                    'ngInject';
                    return Broadcasts(bot.id).one($stateParams.broadcastId).get({include: 'filter,template'});
                }
            }
        })

        .state('app.dashboard.broadcast.show', {
            url: "/:broadcastId",
            title: 'Broadcast Details',
            description: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            component: 'showBroadcast',
            resolve: {
                broadcast: (Broadcasts, $stateParams, bot) => {
                    'ngInject';
                    return Broadcasts(bot.id).one($stateParams.broadcastId).get({include: 'template'});
                }
            }
        })

}


export default BroadcastRoutes;
