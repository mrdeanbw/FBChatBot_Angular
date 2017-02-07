function SettingRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.setting', {
        url: '/settings',
        component: 'setting',
        title: 'Bot Settings',
        description: 'Here you can set up your greeting text. Display a friendly message and encourage them to get engaged with your page!',
        resolve: {
            timezones: () => {
                //@todo list of timezones
            },
            plans: () => {
                // @todo list of pro plans
                // return SubscriptionPlans.getList({ name: 'pro' });
            }
        }
    });


}


export default SettingRoutes;
