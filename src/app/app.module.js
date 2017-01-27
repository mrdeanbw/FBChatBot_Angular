import angular from 'angular';

import 'angular-ui-router';
import './app.templates';
import './auth/auth.module';
import './shared/shared.module';


// Create and bootstrap application
const requires = [
    'templates',
    'ui.router',
    'app.shared',
    'app.auth'
];

// Mount on window for testing
window.app = angular.module('app', requires);

import appRoutes  from './app.routes';
angular.module('app').config(appRoutes);

import appConfig  from './app.config';
angular.module('app').config(appConfig);

import appRun  from './app.run';
angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
