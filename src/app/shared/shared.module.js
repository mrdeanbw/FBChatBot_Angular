import angular from 'angular';
import 'angular-animate';
import '../../../bower_components/ng-lodash/build/ng-lodash.min';

import './bot/bot.module';
import './jstz/jstz.module';
import './user/user.module';
import './pusher/pusher.module';
import './modals/modals.module';
import './loading/loading.module';
import './helpers/helpers.module';
import './facebook/facebook.module';
import './flash-bag/flash-bag.module';
import './constants/constants.module';
import './directives/directives.module';
import './restangular/restangular.module';
import './error-handler/error-handler.module';

let sharedModule = angular.module('app.shared', [
    'ngLodash',
    'ngAnimate',
    'app.shared.bot',
    'app.shared.jstz',
    'app.shared.user',
    'app.shared.modals',
    'app.shared.pusher',
    'app.shared.helpers',
    'app.shared.loading',
    'app.shared.toaster',
    'app.shared.flashBag',
    'app.shared.facebook',
    'app.shared.constants',
    'app.shared.directives',
    'app.shared.restangular',
    'app.shared.errorHandler'
]);

export default sharedModule;