function SequenceRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.sequence', {
            url: '/sequences',
            abstract: true,
            title: 'Sequences',
            breadcrumbState: 'app.dashboard.sequence.index',
            templateUrl: 'dashboard/sequence/views/layout.html',
        })

        .state('app.dashboard.sequence.index', {
            url: '/',
            title: 'Sequences',
            templateUrl: 'dashboard/sequence/views/index.html',
            controller: 'SequenceController as $ctrl',
            description: 'Plan your Campaigns with messages sequences. Plan response sequence to make it easier to plan Campaigns.',
            resolve: {
                sequences: (Sequences, bot) => {
                    'ngInject';
                    return Sequences(bot.id).getList();
                }
            }
        })

        .state('app.dashboard.sequence.edit', {
            url: "/:sequenceId/edit",
            title: 'Edit your sequence',
            description: 'Edit your sequence messages, time-line, segmentation & automation settings!',
            templateUrl: 'dashboard/sequence/views/edit.html',
            controller: 'SequenceController as $ctrl',
            resolve: {
                sequence: (Sequences, $stateParams, bot) => {
                    'ngInject';
                    return Sequences(bot.id).one($stateParams.sequenceId).get();
                }
            }
        })

        .state('app.dashboard.sequence.message', {
            url: "/:sequenceId/message",
            templateUrl: 'dashboard/sequence/views/message/layout.html',
            abstract: true,
            resolve: {
                sequence: (Sequences, $stateParams, bot) => {
                    'ngInject';
                    return Sequences(bot.id).one($stateParams.sequenceId).get();
                }
            }
        })

        .state('app.dashboard.sequence.message.create', {
            url: "/create",
            title: 'New Sequence Message',
            controller: 'SequenceMessageCtrl as $ctrl',
            templateUrl: 'dashboard/sequence/views/message/create.html',
        })

        .state('app.dashboard.sequence.message.edit', {
            url: "/:messageId/edit",
            title: 'Edit Sequence Message',
            controller: 'SequenceMessageCtrl as $ctrl',
            templateUrl: 'dashboard/sequence/views/message/edit.html',
            message: (sequence, $stateParams) => {
                'ngInject';
                for (let message of sequence.messages) {
                    if (message.id === $stateParams.messageId) {
                        return message;
                    }
                }
                return null;
            }
        });
}


export default SequenceRoutes;
