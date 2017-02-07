import angular from 'angular';
import '../shared/shared.module';

let botModule = angular.module('app.bot', [
    'app.shared'
]);

import BotController from './bot.controller'
botModule.controller('BotController', BotController);

import botListComponent from './components/bot-list.component';
botModule.component('botList', botListComponent);

import disabledBotsComponent from './components/disabled-bots.component';
botModule.component('disabledBots', disabledBotsComponent);

import createBotComponent from './components/create-bot.component';
botModule.component('createBot', createBotComponent);

import BotRoutes from './bot.routes'
botModule.config(BotRoutes);

export default botModule;