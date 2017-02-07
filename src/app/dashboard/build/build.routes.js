function BuildRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build', {
        url: '/build',
        abstract: true,
        title: 'Build Bot',
        component: 'buildComponent'
    });

}


export default BuildRoutes;
