import angular from 'angular';

let filtersModule = angular.module('app.dashboard.shared.filters', []);

import percentageFilter from './percentage.filter';
filtersModule.filter('percentage', percentageFilter);

import capitalizeFilter from './capitalize.filter';
filtersModule.filter('capitalize', capitalizeFilter);

import propsFilter from './props.filter';
filtersModule.filter('propsFilter', propsFilter);

import normalizedHashkeyFilter from './normalized-hashkey.filter';
filtersModule.filter('normalizedHashkey', normalizedHashkeyFilter);

import timezoneOffsetFilter from './timezone-offset.filter';
filtersModule.filter('timezoneOffset', timezoneOffsetFilter);

import messageVariablesFilter from './message-variables.filter';
filtersModule.filter('messageVariables', messageVariablesFilter);


export default filtersModule;
