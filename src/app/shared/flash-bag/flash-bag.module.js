import angular from 'angular';
import 'angularjs-toaster';
import 'angular-ui-router';

import '../toaster/toaster.module';

let flashBagModule = angular.module('app.shared.flashBag', [
    'ui.router',
    'app.shared.toaster'
]);

import FlashBagService  from './flash-bag.service';
flashBagModule.service('FlashBag', FlashBagService);

import FlashBagRun  from './flash-bag.run';
flashBagModule.run(FlashBagRun);


export default flashBagModule;