import angular from 'angular';
import 'restangular';
import 'angular-jwt';

import './jwt/jwt.module';
import '../helpers/helpers.module';
import '../constants/constants.module';

let UserModule = angular.module('app.shared.user', [
    'restangular',
    'angular-jwt',
    'app.shared.user.jwt',
    'app.shared.helpers',
    'app.shared.constants'
]);

import UserService  from './user.service';
UserModule.service('UserService', UserService);

import UserConfig from './user.config';
UserModule.config(UserConfig);

export default UserModule;