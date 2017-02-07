function MessageTreeRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.message-tree', {
        url: '/message-trees',
        abstract: true,
        templateUr: 'dashboard/build/message-tree/views/layout.html'
    });

    $stateProvider.state('app.dashboard.build.message-tree.index', {
        url: '/',
        component: 'messageTreeList',
        title: 'Message Trees',
        description: 'Pre-defined message trees to be used across the app. A very powerful tool to chain your messages, use certain messages for more than one purpose, and to provide instant and smart button feedback!',
        resolve: {
            trees: (Templates, bot) => {
                'ngInject';
                return Templates(bot.id).getList();
            }
        }
    });

    $stateProvider.state('app.dashboard.build.message-tree.create', {
        url: '/create',
        component: 'createMessageTree',
        title: 'Create Message Tree',
        description: 'Configure your message tree nodes and a descriptive name so that you can find it easily!',
        resolve: {
            trees: (Templates, bot) => {
                'ngInject';
                return Templates(bot.id).getList();
            }
        }
    });

    $stateProvider.state('app.dashboard.build.message-tree.edit', {
        url: '/:templateId',
        component: 'editMessageTree',
        title: 'Edit Message Tree',
        description: 'Update your message tree.',
        resolve: {
            tree: (Templates, $stateParams, bot) => {
                'ngInject';
                return Templates(bot.id).one($stateParams.templateId).get();
            },
            trees: (Templates, bot) => {
                'ngInject';
                return Templates(bot.id).getList();
            }
        }
    });

}


export default MessageTreeRoutes;
