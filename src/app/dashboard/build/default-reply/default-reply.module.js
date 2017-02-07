import angular from 'angular';

let defaultReplyModule = angular.module('app.dashboard.build.defaultReply', []);

import DefaultReplyComponent from './default-reply.component';
defaultReplyModule.component('defaultReply', DefaultReplyComponent);

import defaultReplyRoutes from './default-reply.routes'
defaultReplyModule.config(defaultReplyRoutes);

export default defaultReplyModule;