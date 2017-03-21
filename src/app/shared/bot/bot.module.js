import angular from 'angular';
import 'restangular'

let BotModule = angular.module('app.shared.bot', [
    'restangular'
]);

import Bots  from './bot.service';
BotModule.service('Bots', Bots);

import DisabledBots from './disabled-bot.service';
BotModule.service('DisabledBots', DisabledBots);

import Pages  from './page.service';
BotModule.service('Pages', Pages);

export default BotModule;