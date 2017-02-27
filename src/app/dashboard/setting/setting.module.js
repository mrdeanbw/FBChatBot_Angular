import angular from 'angular';

let settingModule = angular.module('app.dashboard.setting', []);

import settingComponent from './setting.component';
settingModule.component('setting', settingComponent);

import settingRoutes from './setting.routes'
settingModule.config(settingRoutes);

export default settingModule;