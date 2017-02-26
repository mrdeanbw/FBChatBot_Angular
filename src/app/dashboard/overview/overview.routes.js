function OverviewRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.overview', {
        url: '/overview',
        title: 'Overview',
        component: 'overview',
    });
}


export default OverviewRoutes;
