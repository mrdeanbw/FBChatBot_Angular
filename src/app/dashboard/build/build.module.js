import angular from 'angular';

import './main-menu/main-menu.module';
import './message-tree/message-tree.module';
import './greeting-text/greeting-text.module';
import './default-reply/default-reply.module';
import './welcome-message/welcome-message.module';
import './auto-reply-rule/auto-reply-rule.module';

let buildModule = angular.module('app.dashboard.build', [
    'app.dashboard.build.mainMenu',
    'app.dashboard.build.messageTree',
    'app.dashboard.build.greetingText',
    'app.dashboard.build.defaultReply',
    'app.dashboard.build.autoReplyRule',
    'app.dashboard.build.welcomeMessage'
]);

import buildComponent from './build.component';
buildModule.component('buildComponent', buildComponent);

import buildRoutes from './build.routes'
buildModule.config(buildRoutes);

export default buildModule;