import angular from 'angular';

let directivesModule = angular.module('app.dashboard.shared.directives', []);

import timepicker from './timepicker.directive';
directivesModule.directive('timepicker', timepicker);


export default directivesModule;
