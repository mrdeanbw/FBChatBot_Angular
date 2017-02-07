import angular from 'angular';

let messageModule = angular.module('app.dashboard.shared.message', []);


import MessageHelperService from './helpers.service';
messageModule.service('MessageHelpers', MessageHelperService);

import messageTemplateComponent from './message-template.component';
messageModule.component('messageTemplate', messageTemplateComponent);

import messagePreviewComponent from './message-preview.component';
messageModule.component('messagePreview', messagePreviewComponent);

import textMessageComponent from './text/text-message.component';
messageModule.component('textMessage', textMessageComponent);

import textPreviewComponent from './text/text-preview.component';
messageModule.component('textPreview', textPreviewComponent);

import imageMessageComponent from './image/image-message.component';
messageModule.component('imageMessage', imageMessageComponent);

import imagePreviewComponent from './image/image-preview.component';
messageModule.component('imagePreview', imagePreviewComponent);

import cardContainerMessageComponent from './card/card-container-message.component';
messageModule.component('cardContainerMessage', cardContainerMessageComponent);

import cardContainerPreviewComponent from './card/card-container-preview.component';
messageModule.component('cardContainerPreview', cardContainerPreviewComponent);

import cardMessageComponent from './card/card-message.component';
messageModule.component('cardMessage', cardMessageComponent);

import buttonMessageComponent from './button/button-message.component';
messageModule.component('buttonMessage', buttonMessageComponent);


export default messageModule;