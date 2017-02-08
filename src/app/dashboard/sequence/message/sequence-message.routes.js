function SequenceMessageRoutes($stateProvider) {
    'ngInject';


    $stateProvider

        .state('app.dashboard.sequence.message', {
            url: "/:sequenceId/message",
            templateUrl: 'dashboard/sequence/message/views/layout.html',
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
            component: 'createSequenceMessage'
        })

        .state('app.dashboard.sequence.message.edit', {
            url: "/:messageId/edit",
            title: 'Edit Sequence Message',
            component: 'editSequenceMessage',
            message: (sequence, $stateParams) => {
                sequence.one('messages', $stateParams.messageId).get({include: 'template'});
            }
        });
}


export default SequenceMessageRoutes;
