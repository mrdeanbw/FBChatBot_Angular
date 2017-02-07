import angular from 'angular';

let overviewModule = angular.module('app.dashboard.overview', []);

import OverviewComponent from './overview.component';
overviewModule.component('overview', OverviewComponent);

import OverviewRoutes from './overview.routes';
overviewModule.config(OverviewRoutes);

export default overviewModule;