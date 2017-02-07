import angular from 'angular';
import 'ng-table';

let subscriberModule = angular.module('app.dashboard.subscriber', []);

import SubscriberController from './subscriber.controller';
subscriberModule.controller('SubscriberController', SubscriberController);

import subscriberRoutes from './subscriber.routes'
subscriberModule.config(subscriberRoutes);

export default subscriberModule;