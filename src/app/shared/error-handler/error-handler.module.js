import angular from 'angular';

import '../user/user.module';
import '../pusher/pusher.module';
import '../toaster/toaster.module';
import '../constants/constants.module';
import '../flash-bag/flash-bag.module';

let errorHandlerModule = angular.module('app.shared.errorHandler', [
    'app.shared.user',
    'app.shared.pusher',
    'app.shared.toaster',
    'app.shared.flashBag',
    'app.shared.constants'
]);

import errorHandlerConfig from './error-handler.config';
errorHandlerModule.config(errorHandlerConfig);

import errorHandlerRun from './error-handler.run';
errorHandlerModule.run(errorHandlerRun);


export default errorHandlerModule;