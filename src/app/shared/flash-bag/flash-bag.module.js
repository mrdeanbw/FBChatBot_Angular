import angular from 'angular';

let flashBagModule = angular.module('app.shared.flashBag', []);

import FlashBagService  from './flash-bag.service';
flashBagModule.service('FlashBag', FlashBagService);