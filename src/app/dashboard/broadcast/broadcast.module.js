import angular from 'angular';
import 'angular-wizard';

let broadcastModule = angular.module('app.dashboard.broadcast', [
    'mgo-angular-wizard'
]);

import BroadcastService from './broadcast.service';
broadcastModule.service('BroadcastService', BroadcastService);

import BroadcastController from './broadcast.controller';
broadcastModule.controller('BroadcastController', BroadcastController);

import BroadcastRoutes from './broadcast.routes';
broadcastModule.config(BroadcastRoutes);

export default broadcastModule;