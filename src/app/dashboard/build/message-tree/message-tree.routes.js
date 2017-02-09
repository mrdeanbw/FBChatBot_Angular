function MessageTreeRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.message-tree', {
        url: '/message-trees',
        abstract: true,
        title: 'Message Tress',
        templateUrl: 'dashboard/build/message-tree/views/layout.html'
    });

    $stateProvider.state('app.dashboard.build.message-tree.index', {
        url: '/',
        component: 'messageTreeList',
        title: 'Message Tree List',
        description: 'Pre-defined message trees to be used across the app. A very powerful tool to chain your messages, use certain messages for more than one purpose, and to provide instant and smart button feedback!',
        resolve: {
            trees: (MessageTrees, bot) => {
                'ngInject';
                return MessageTrees(bot.id).getList();
            }
        }
    });

    $stateProvider.state('app.dashboard.build.message-tree.create', {
        url: '/create',
        component: 'createMessageTree',
        title: 'Create Message Tree',
        description: 'Configure your message tree nodes and a descriptive name so that you can find it easily!',
    });

    $stateProvider.state('app.dashboard.build.message-tree.edit', {
        url: '/:treeId',
        component: 'editMessageTree',
        title: 'Edit Message Tree',
        description: 'Update your message tree.',
        resolve: {
            tree: (MessageTrees, $stateParams, bot) => {
                'ngInject';
                return MessageTrees(bot.id).one($stateParams.treeId).get({include: 'messages'});
            }
        }
    });

}


export default MessageTreeRoutes;
