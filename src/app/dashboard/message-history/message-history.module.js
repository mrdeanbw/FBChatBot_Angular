import angular from 'angular';

let messageHistoryModule = angular.module('app.dashboard.message.history', []);

import MessageRevisions from './message-revision.service';
messageHistoryModule.service('MessageRevisions', MessageRevisions);

import MessageHistoryComponent from './message-history.component';
messageHistoryModule.component('messageHistory', MessageHistoryComponent);

import MessageHistoryController from './message-history.controller';
messageHistoryModule.controller('MessageHistoryController', MessageHistoryController);

import MessageHistoryRoutes from './message-history.routes';
messageHistoryModule.config(MessageHistoryRoutes);

export default messageHistoryModule;
