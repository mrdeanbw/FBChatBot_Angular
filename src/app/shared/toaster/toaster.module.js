import angular from 'angular';
import 'angularjs-toaster';

let toasterModule = angular.module('app.shared.toaster', [
    'toaster'
]);

import DefaultToaster from './default-toaster.component';
toasterModule.component('defaultToaster', DefaultToaster);

export default toasterModule;
