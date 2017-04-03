import angular from 'angular';

let directivesModule = angular.module('app.dashboard.shared.directives', []);

import TimepickerDirective from './timepicker.directive';
directivesModule.directive('timepicker', TimepickerDirective);

import DatepickerDirective from './datepicker.directive';
directivesModule.directive('datepicker', DatepickerDirective);

import BtnConfirmDirective from './btn-confirm.directive';
directivesModule.directive('btnConfirm', BtnConfirmDirective);

import TagsInputDirective from './tagsinput.directive';
directivesModule.directive('tagsInput', TagsInputDirective);

export default directivesModule;
