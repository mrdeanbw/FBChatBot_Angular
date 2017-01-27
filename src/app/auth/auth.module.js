import angular from 'angular';
import 'ng-facebook';
import '../shared/shared.module';

let authModule = angular.module('app.auth', [
    'ngFacebook',
    'app.shared'
]);

import AuthConfig from './auth.config';
authModule.config(AuthConfig);

import AuthRoutes from './auth.routes';
authModule.config(AuthRoutes);

import AuthCtrl from './auth.controller';
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;