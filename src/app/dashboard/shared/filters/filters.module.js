import angular from 'angular';

let filtersModule = angular.module('app.dashboard.shared.filters', []);


import percentageFilter from './percentage.filter';
filtersModule.filter('percentage', percentageFilter);

import capitalizeFilter from './capitalize.filter';
filtersModule.filter('capitalize', capitalizeFilter);

import timezonedFilter from './timezoned.filter';
filtersModule.filter('timezoned', timezonedFilter);

import propsFilter from './props.filter';
filtersModule.filter('propsFilter', propsFilter);

import normalizedHashkeyFilter from './normalized-hashkey.filter';
filtersModule.filter('normalizedHashkey', normalizedHashkeyFilter);


export default filtersModule;
