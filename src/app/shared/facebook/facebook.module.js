import angular from 'angular';
import 'ng-facebook';


let facebookModule = angular.module('app.shared.facebook', [
    'ngFacebook',
    'app.shared.constants'
]);

import FacebookConfig from './facebook.config';
facebookModule.config(FacebookConfig);

export default facebookModule;