import angular from 'angular';
import 'angular-wizard';

let broadcastModule = angular.module('app.dashboard.broadcast', [
    'mgo-angular-wizard'
]);

import BroadcastListComponent from './broadcast-list.component';
broadcastModule.component('broadcastList', BroadcastListComponent);

import CreateBroadcastComponent from './create-broadcast.component';
broadcastModule.component('createBroadcast', CreateBroadcastComponent);

import EditBroadcastComponent from './edit-broadcast.component';
broadcastModule.component('editBroadcast', EditBroadcastComponent);

import BroadcastService from './broadcast.service';
broadcastModule.service('Broadcasts', BroadcastService);

import BroadcastController from './broadcast.controller';
broadcastModule.controller('BroadcastController', BroadcastController);

import BroadcastRoutes from './broadcast.routes';
broadcastModule.config(BroadcastRoutes);

export default broadcastModule;