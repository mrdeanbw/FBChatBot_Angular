import angular from 'angular';

import './build/build.module';
import './shared/shared.module';
import './overview/overview.module';
import './sequence/sequence.module';
import './broadcast/broadcast.module';
import './subscriber/subscriber.module';

let dashboardModule = angular.module('app.dashboard', [
    'app.dashboard.build',
    'app.dashboard.shared',
    'app.dashboard.overview',
    'app.dashboard.sequence',
    'app.dashboard.broadcast',
    'app.dashboard.subscriber'
]);

import DashboardRoutes from './dashboard.routes';
dashboardModule.config(DashboardRoutes);

import DashboardComponent from './dashboard.component';
dashboardModule.component('dashboardComponent', DashboardComponent);

import headerView from './views/header-view.component';
dashboardModule.component('headerView', headerView);

import sidebarView from './views/sidebar-view.component';
dashboardModule.component('sidebarView', sidebarView);

import footerView from './views/footer-view.component';
dashboardModule.component('footerView', footerView);

export default dashboardModule;