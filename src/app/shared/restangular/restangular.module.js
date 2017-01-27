import 'restangular'
import angular from 'angular';
import '../constants/constants.module'

let restangularModule = angular.module('app.shared.restangular', [
    'restangular',
    'app.shared.constants'
]);

import RestangularConfig from './restangular.config';
restangularModule.config(RestangularConfig);
