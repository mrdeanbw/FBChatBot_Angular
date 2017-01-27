import 'angularjs-toaster';
import angular from 'angular';

import './user/user.module'
import './flash-bag/flash-bag.module'
import './constants/constants.module'
import './restangular/restangular.module'

let sharedModule = angular.module('app.shared', [
    'toaster',
    'app.shared.user',
    'app.shared.flashBag',
    'app.shared.constants',
    'app.shared.restangular'
]);

import DefaultToaster from './default-toaster/default-toaster.component';
sharedModule.component('defaultToaster', DefaultToaster);
