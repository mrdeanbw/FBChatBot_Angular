import angular from 'angular';

let messagePreviewModule = angular.module('app.dashboard.shared.message-preview', []);

import MessagePreviewService from './message-preview.service';
messagePreviewModule.service('MessagePreviews', MessagePreviewService);

import messagePreviewComponent from './message-preview.component';
messagePreviewModule.component('messagePreview', messagePreviewComponent);

export default messagePreviewModule;