function BotRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app.bot', {
            url: '/chat-bots',
            abstract: true,
            templateUrl: 'bot/views/layout.html',
            resolve: {
                auth: (UserService) => {
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
                bots: Bots => Bots.getList()
            }
        })

        .state('app.bot.disabled', {
            url: '/disabled',
            component: 'disabledBots',
            resolve: {
                activeBots: Bots => {
                    'ngInject';
                    return Bots.getList()
                },
                disabledBots: Bots => {
                    'ngInject';
                    return Bots.getList({disabled: true})
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
                activeBots: Bots => {
                    'ngInject';
                    return Bots.getList();
                },
                disabledBots: Bots => {
                    'ngInject';
                    return Bots.getList({disabled: true});
                }
            }
        });
}

export default BotRoutes;
