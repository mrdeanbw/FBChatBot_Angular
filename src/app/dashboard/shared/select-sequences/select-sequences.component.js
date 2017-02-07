class SelectSequencesController {
    constructor(Sequences, $rootScope) {
        'ngInject';
        this.sequences = [];
        Sequences($rootScope.bot.id).getList().then(sequences => this.sequences = sequences);
    }
}

export default{
    templateUrl: 'dashboard/shared/select-sequences/select-sequences.html',
    bindings: {label: '<', model: '='},
    controller: SelectSequencesController
}