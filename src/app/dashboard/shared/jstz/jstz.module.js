import angular from 'angular';

let jstzModule = angular.module('app.dashboard.shared.jstz', []);

jstzModule.factory('jstz', $window => {
    'ngInject';
    return $window.jstz;
});

export default jstzModule;