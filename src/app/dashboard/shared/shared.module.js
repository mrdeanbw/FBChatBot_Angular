import angular from 'angular';
import 'ng-file-upload';
import 'angular-sanitize';
import 'angular-ui-select/select.min';

import './message/message.module';
import './filters/filters.module';
import './services/services.module';
import './pagination/pagination.module';
import './directives/directives.module';

let sharedModule = angular.module('app.dashboard.shared', [
    'ui.select', 
    'ngSanitize',
    'ngFileUpload',
    'app.dashboard.shared.message',
    'app.dashboard.shared.filters',
    'app.dashboard.shared.services',
    'app.dashboard.shared.directives',
    'app.dashboard.shared.pagination'
]);

import pageHeaderComponent from './page-header/page-header.component';
sharedModule.component('pageHeader', pageHeaderComponent);

import BreadcrumbComponent from './breadcrumb/breadcrumb.component';
sharedModule.component('breadcrumb', BreadcrumbComponent);

import imageUploaderComponent from './image-uploader/image-uploader.component';
sharedModule.component('imageUploader', imageUploaderComponent);

import SelectTreeComponent from './select-tree/select-tree.component';
sharedModule.component('selectTree', SelectTreeComponent);

export default sharedModule;