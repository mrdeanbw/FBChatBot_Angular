function MessageHistoryRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app.dashboard.message-history', {
            url: '/messages/:messageId/history?mainMenuButton',
            title: 'Message History',
            component: 'messageHistory',
            bodyClass: 'menu-pin',
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
