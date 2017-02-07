import angular from 'angular';
import '../shared/shared.module';

let authModule = angular.module('app.auth', [
    'app.shared'
]);

import AuthRoutes from './auth.routes';
authModule.config(AuthRoutes);

import AuthController from './auth.controller';
authModule.controller('AuthController', AuthController);

export default authModule;