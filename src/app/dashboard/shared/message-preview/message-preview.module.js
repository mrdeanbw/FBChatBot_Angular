import angular from 'angular';

let messagePreviewModule = angular.module('app.dashboard.shared.message-preview', []);

import MessagePreviewService from './message-preview.service';
messagePreviewModule.service('MessagePreviews', MessagePreviewService);

import messagePreviewComponent from './message-preview.component';
messagePreviewModule.component('messagePreview', messagePreviewComponent);

import textPreviewComponent from './text/text-preview.component';
messagePreviewModule.component('textPreview', textPreviewComponent);

import imagePreviewComponent from './image/image-preview.component';
messagePreviewModule.component('imagePreview', imagePreviewComponent);

import cardContainerPreviewComponent from './card/card-container-preview.component';
messagePreviewModule.component('cardContainerPreview', cardContainerPreviewComponent);

export default messagePreviewModule;