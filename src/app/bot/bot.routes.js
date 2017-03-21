function BotRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app.bot', {
            url: '/chat-bots',
            abstract: true,
            templateUrl: 'bot/views/layout.html',
            resolve: {
                auth: UserService => {
                    'ngInject';
                    return UserService.ensureAuthIs(true);
                }
            }
        })

        .state('app.bot.index', {
            url: '/',
            component: 'botList',
            title: 'Chat Bots',
            resolve: {
                activeBots: Bots => {
                    'ngInject';
                    return Bots.getList();
                },
                disabledBotCount: DisabledBots => {
                    'ngInject';
                    return DisabledBots.one('count').get();
                }
            }
        })

        .state('app.bot.disabled', {
            url: '/deactivated',
            component: 'disabledBots',
            title: 'Deactivated Chat Bots',
            resolve: {
                activeBotCount: Bots => {
                    'ngInject';
                    return Bots.one('count').get()
                },
                disabledBots: DisabledBots => {
                    'ngInject';
                    return DisabledBots.getList()
                }
            }
        })

        .state('app.bot.create', {
            url: '/create',
            component: 'createBot',
            title: 'Create Chat Bot',
            resolve: {
                pages: Pages => {
                    'ngInject';
                    return Pages.getList({notManagedByUser: true});
                },
                activeBotCount: Bots => {
                    'ngInject';
                    return Bots.one('count').get();
                },
                disabledBotCount: DisabledBots => {
                    'ngInject';
                    return DisabledBots.one('count').get();
                }
            }
        });
}

export default BotRoutes;
