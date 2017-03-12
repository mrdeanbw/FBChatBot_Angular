import angular from 'angular';

let messageDetailsModule = angular.module('app.dashboard.shared.message-details', []);

import messageStats from './message-stats.component';
messageDetailsModule.component('messageStats', messageStats);

import messageDetails from './message-details.component';
messageDetailsModule.component('messageDetails', messageDetails);

import textDetailsComponent from './text/text-details.component';
messageDetailsModule.component('textDetails', textDetailsComponent);

import imageDetailsComponent from './image/image-details.component';
messageDetailsModule.component('imageDetails', imageDetailsComponent);

import cardContainerDetailsComponent from './card/card-container-details.component';
messageDetailsModule.component('cardContainerDetails', cardContainerDetailsComponent);

import buttonDetailsComponent from './button/button-details.component';
messageDetailsModule.component('buttonDetails', buttonDetailsComponent);

export default messageDetailsModule;
