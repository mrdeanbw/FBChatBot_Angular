function MessageHistoryRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app.dashboard.message', {
            url: '/messages',
            abstract: true,
            title: 'Messages',
            template: '<ui-view></ui-view>'
        })

        .state('app.dashboard.message.history', {
            url: '/:messageId/history',
            title: 'History',
            component: 'messageHistory',
            description: 'Your message change log history and stats.',
            resolve: {
                revisions: (MessageRevisions, $stateParams, bot) => {
                    'ngInject';
                    return MessageRevisions(bot.id, $stateParams.messageId).getList();
                }
            }
        });
}


export default MessageHistoryRoutes;
