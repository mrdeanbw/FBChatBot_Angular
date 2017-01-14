/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

var app = angular.module('MrReply', [
    'ui.router',
    'ui.utils',
    'dashboard',
    'auth',
    'FlashBag',
    'ngStorage',
    'Authentication',
    'nl2br',
    'angular-jwt',
    'HTTPInterceptor',
    'restangular',
    'toaster',
    'ngFacebook'
]);