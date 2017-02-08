import angular from 'angular';

import './message/sequence-message.module';

let sequenceModule = angular.module('app.dashboard.sequence', [
    'app.dashboard.sequence.message'
]);

import SequenceListComponent from './sequence-list.component';
sequenceModule.component('sequenceList', SequenceListComponent);

import EditSequenceComponent from './edit-sequence.component';
sequenceModule.component('editSequence', EditSequenceComponent);

import SequenceController from './sequence.controller';
sequenceModule.controller('SequenceController', SequenceController);

import sequenceRoutes from './sequence.routes'
sequenceModule.config(sequenceRoutes);

export default sequenceModule;