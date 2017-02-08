import angular from 'angular';

let directivesModule = angular.module('app.dashboard.shared.directives', []);

import TimepickerDirective from './timepicker.directive';
directivesModule.directive('timepicker', TimepickerDirective);

import DatepickerDirective from './datepicker.directive';
directivesModule.directive('datepicker', DatepickerDirective);


export default directivesModule;
