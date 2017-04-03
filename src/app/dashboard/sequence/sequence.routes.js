function SequenceRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.sequence', {
            url: '/sequences',
            abstract: true,
            title: 'Sequences',
            breadcrumb: {
                stateName: 'app.dashboard.sequence.index'
            },
            templateUrl: 'dashboard/sequence/views/layout.html'
        })

        .state('app.dashboard.sequence.index', {
            url: '/',
            title: 'Sequences',
            component: 'sequenceList',
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
            title: 'Edit Sequence',
            description: 'Edit your sequence messages, time-line, segmentation & automation settings!',
            component: 'editSequence',
            resolve: {
                sequence: (Sequences, $stateParams, bot) => {
                    'ngInject';
                    return Sequences(bot.id).one($stateParams.sequenceId).get({include: 'messages,filter'});
                }
            }
        });
}


export default SequenceRoutes;
