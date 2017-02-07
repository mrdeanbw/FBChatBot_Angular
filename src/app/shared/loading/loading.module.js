import angular from 'angular';

let loadingModule = angular.module('app.shared.loading', []);

import LoadingConfig from './loading.config';
loadingModule.config(LoadingConfig);

export default loadingModule;