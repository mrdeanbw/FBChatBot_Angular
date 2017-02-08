import angular from 'angular';

let sequenceMessageModule = angular.module('app.dashboard.sequence.message', []);

import CreateMessageComponent from './create-message.component';
sequenceMessageModule.component('createSequenceMessage', CreateMessageComponent);

import EditMessageComponent from './edit-message.component';
sequenceMessageModule.component('editSequenceMessage', EditMessageComponent);

import SequenceMessageController from './sequence-message.controller';
sequenceMessageModule.controller('SequenceMessageController', SequenceMessageController);

import SequenceMessageRoutes from './sequence-message.routes'
sequenceMessageModule.config(SequenceMessageRoutes);

export default sequenceMessageModule;