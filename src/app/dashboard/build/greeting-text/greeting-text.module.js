import angular from 'angular';

let greetingTextModule = angular.module('app.dashboard.build.greetingText', []);

import GreetingTextComponent from './greeting-text.component';
greetingTextModule.component('greetingText', GreetingTextComponent);

import GreetingTextRoutes from './greeting-text.routes'
greetingTextModule.config(GreetingTextRoutes);

export default greetingTextModule;