import angular from 'angular';

let directivesModule = angular.module('app.shared.directives', []);


import csSelect from './cs-select.directive';
directivesModule.directive('csSelect', csSelect);

import pgFormGroup from './pg-form-group.directive';
directivesModule.directive('pgFormGroup', pgFormGroup);

import pgNavigate from './pg-navigate.directive';
directivesModule.directive('pgNavigate', pgNavigate);

import pgPortlet from './pg-portlet.directive';
directivesModule.directive('pgPortlet', pgPortlet);

import pgSidebar from './pg-sidebar.directive';
directivesModule.directive('pgSidebar', pgSidebar);

import pgTab from './pg-tab.directive';
directivesModule.directive('pgTab', pgTab);

import pgTabDropdownfx from './pg-tab-dropdownfx.directive';
directivesModule.directive('pgTabDropdownfx', pgTabDropdownfx);

import pgTooltip from './pg-tooltip.directive';
directivesModule.directive('pgTooltip', pgTooltip);

import pgPopover from './pg-popover.directive';
directivesModule.directive('pgPopover', pgPopover);

import includeReplace from './include-replace.directive';
directivesModule.directive('includeReplace', includeReplace);


export default directivesModule;
