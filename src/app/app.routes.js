function AppRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app', {
            abstract: true,
            templateUrl: 'layout/index.html'
        })

        .state('app.404', {
            title: 'Page not found',
            templateUrl: 'layout/errors/404.html'
        })

        .state('app.button', {
            url: '/button-not-found',
            title: 'Button Not Found!',
            templateUrl: 'layout/errors/button.html'
        })

        .state('app.500', {
            title: 'Unexpected Error',
            templateUrl: 'layout/errors/500.html'
        });
}


export default AppRoutes;
