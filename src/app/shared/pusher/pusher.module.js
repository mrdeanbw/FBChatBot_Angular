import angular from 'angular';
import '../../../../bower_components/angular-pusher/angular-pusher.min';

let pusherModule = angular.module('app.shared.pusher', [
    'doowb.angular-pusher',
    'app.shared.constants'
]);

import pusherConfig  from './pusher.config';
pusherModule.config(pusherConfig);

export default pusherModule;