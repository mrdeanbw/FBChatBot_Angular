import angular from 'angular';
import 'angular-ui-bootstrap';

let paginationModule = angular.module('app.dashboard.shared.pagination', [
    'ui.bootstrap'
]);

import paginationComponent from './pagination.component';
paginationModule.component('pagination', paginationComponent);

export default paginationModule;