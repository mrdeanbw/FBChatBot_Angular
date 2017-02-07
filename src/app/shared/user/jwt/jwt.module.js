import angular from 'angular';
import '../../constants/constants.module';

let JWTModule = angular.module('app.shared.user.jwt', [
    'app.shared.constants'
]);

import JwtService  from './jwt.service';
JWTModule.service('JwtService', JwtService);

export default JWTModule;