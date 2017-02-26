function OverviewRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.overview', {
        url: '/overview',
        title: 'Overview',
        component: 'overview',
        resolve: {
            data: bot => {
                'ngInject';
                return bot.customGET('stats', {graph_date: 'last_seven_days'})
            }
        }
    });
}


export default OverviewRoutes;
