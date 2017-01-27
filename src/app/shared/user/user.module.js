import angular from 'angular';
import 'restangular'

import './jwt/jwt.module';

let UserModule = angular.module('app.shared.user', [
    'app.shared.user.jwt',
    'restangular'
]);

import UserService  from './user.service';
UserModule.service('UserService', UserService);