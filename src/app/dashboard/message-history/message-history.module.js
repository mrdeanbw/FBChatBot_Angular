import angular from 'angular';

let messageHistoryModule = angular.module('app.dashboard.message.history', []);

import MessageRevisions from './message-revision.service';
messageHistoryModule.service('MessageRevisions', MessageRevisions);

import MainMenuButtonRevisions from './main-menu-button-revision.service';
messageHistoryModule.service('MainMenuButtonRevisions', MainMenuButtonRevisions);

import MessageHistoryComponent from './message-history.component';
messageHistoryModule.component('messageHistory', MessageHistoryComponent);

import MessageHistoryRoutes from './message-history.routes';
messageHistoryModule.config(MessageHistoryRoutes);

export default messageHistoryModule;
