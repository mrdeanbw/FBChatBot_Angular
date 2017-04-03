import angular from 'angular';

let jstzModule = angular.module('app.shared.jstz', []);

jstzModule.factory('jstz', $window => {
    'ngInject';
    return $window.jstz;
});

export default jstzModule;