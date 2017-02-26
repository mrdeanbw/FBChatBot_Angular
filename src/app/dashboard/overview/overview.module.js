import angular from 'angular';
import 'angular-nvd3';

let overviewModule = angular.module('app.dashboard.overview', ['nvd3']);

import OverviewComponent from './overview.component';
overviewModule.component('overview', OverviewComponent);

import OverviewRoutes from './overview.routes';
overviewModule.config(OverviewRoutes);

export default overviewModule;