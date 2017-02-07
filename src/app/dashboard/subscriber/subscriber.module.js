import angular from 'angular';
import 'ng-table';
import 'angular-relative-date';

let subscriberModule = angular.module('app.dashboard.subscriber', [
    'ngTable',
    'relativeDate'
]);

import SubscriberListComponent from './subscriber-list.component';
subscriberModule.component('subscriberList', SubscriberListComponent);

import ShowSubscriberComponent from './show-subscriber.component';
subscriberModule.component('showSubscriber', ShowSubscriberComponent);

import SubscriberController from './subscriber.controller';
subscriberModule.controller('SubscriberController', SubscriberController);

import subscriberRoutes from './subscriber.routes'
subscriberModule.config(subscriberRoutes);

export default subscriberModule;