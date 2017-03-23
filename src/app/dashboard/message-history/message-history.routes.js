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
            url: '/:messageId/history?mainMenuButton',
            title: 'History',
            component: 'messageHistory',
            description: 'Your message change log history and stats.',
            resolve: {
                revisions: (MessageRevisions, MainMenuButtonRevisions, $stateParams, bot) => {
                    'ngInject';
                    if ($stateParams.mainMenuButton) {
                        return MainMenuButtonRevisions(bot.id, $stateParams.messageId).getList();
                    }

                    return MessageRevisions(bot.id, $stateParams.messageId).getList();
                }
            }
        });
}


export default MessageHistoryRoutes;
