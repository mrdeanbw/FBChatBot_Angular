function AppConfig($locationProvider, $stateProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'layout/app-view.html'
    });

}

export default AppConfig;
