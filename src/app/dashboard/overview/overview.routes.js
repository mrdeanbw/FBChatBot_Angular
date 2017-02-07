function OverviewRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.overview', {
        url: '/overview',
        title: 'Overview',
        component: 'overview',
        breadcrumbState: 'app.dashboard.overview'
    });
}


export default OverviewRoutes;
