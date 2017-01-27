import angular from 'angular';

let constantsModule = angular.module('app.shared.constants', []);

import AppConstants  from './constants';
constantsModule.constant('AppConstants', AppConstants);