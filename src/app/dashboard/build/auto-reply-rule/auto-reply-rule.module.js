import angular from 'angular';

let autoReplyRuleModule = angular.module('app.dashboard.build.autoReplyRule', []);

import AutoReplyRuleComponent from './auto-reply-rule.component';
autoReplyRuleModule.component('autoReplyRule', AutoReplyRuleComponent);

import AutoReplyRuleRoutes from './auto-reply-rule.routes';
autoReplyRuleModule.config(AutoReplyRuleRoutes);

import AutoReplyRuleService from './auto-reply-rule.service';
autoReplyRuleModule.service('AutoReplyRules', AutoReplyRuleService);

export default autoReplyRuleModule;