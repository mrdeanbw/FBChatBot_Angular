import angular from 'angular';
import 'angular-modal-service';

let modalModule = angular.module('app.shared.modals', [
    'angularModalService'
]);

import Modals from './modals.service';
modalModule.service('Modals', Modals);

export default modalModule;
