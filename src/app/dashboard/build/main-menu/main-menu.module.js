import angular from 'angular';

let mainMenuModule = angular.module('app.dashboard.build.mainMenu', []);

import MainMenuComponent from './main-menu.component';
mainMenuModule.component('mainMenu', MainMenuComponent);

import MainMenuRoutes from './main-menu.routes'
mainMenuModule.config(MainMenuRoutes);

export default mainMenuModule;