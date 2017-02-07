import angular from 'angular';

let helpersModule = angular.module('app.shared.helpers', []);

import AppHelpers from './helpers.service';
helpersModule.service('AppHelpers', AppHelpers);

export default helpersModule;