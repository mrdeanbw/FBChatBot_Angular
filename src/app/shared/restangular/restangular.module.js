import angular from 'angular';
import 'restangular'

import '../constants/constants.module'

let restangularModule = angular.module('app.shared.restangular', [
    'restangular',
    'app.shared.constants'
]);

import RestangularConfig from './restangular.config';
restangularModule.config(RestangularConfig);

export default restangularModule;
