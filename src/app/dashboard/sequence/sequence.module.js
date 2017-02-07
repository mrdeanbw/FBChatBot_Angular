import angular from 'angular';

let sequenceModule = angular.module('app.dashboard.sequence', []);

import SequenceController from './sequence.controller';
sequenceModule.controller('SequenceController', SequenceController);

import sequenceRoutes from './sequence.routes'
sequenceModule.config(sequenceRoutes);

export default sequenceModule;