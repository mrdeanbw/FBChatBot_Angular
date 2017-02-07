import angular from 'angular';
import 'angular-ui-tree';

let messageTreeModule = angular.module('app.dashboard.build.messageTree', [
    'ui.tree',
]);

import MessageTreeController from './message-tree.controller';
messageTreeModule.controller('MessageTreeController', MessageTreeController);

import MessageTreeListComponent from './message-tree-list.component';
messageTreeModule.component('messageTreeList', MessageTreeListComponent);

import CreateMessageTreeComponent from './create-message-tree.component';
messageTreeModule.component('createMessageTree', CreateMessageTreeComponent);

import EditMessageTreeComponent from './edit-message-tree.component';
messageTreeModule.component('editMessageTree', EditMessageTreeComponent);

import MessageTreeRoutes from './message-tree.routes';
messageTreeModule.config(MessageTreeRoutes);


export default messageTreeModule;