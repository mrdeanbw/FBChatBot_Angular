import angular from 'angular';

let welcomeMessageModule = angular.module('app.dashboard.build.welcomeMessage', []);

import WelcomeMessageComponent from './welcome-message.component';
welcomeMessageModule.component('welcomeMessage', WelcomeMessageComponent);

import WelcomeMessageRoutes from './welcome-message.routes'
welcomeMessageModule.config(WelcomeMessageRoutes);

export default welcomeMessageModule;