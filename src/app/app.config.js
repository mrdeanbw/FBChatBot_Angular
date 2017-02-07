let redirectTo404 = $injector => {
    'ngInject';
    return $injector.get('$state').go('app.404');
};

let redirectToBots = $injector => {
    'ngInject';
    return $injector.get('$state').go('app.bot.index');
};

function AppConfig($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('/', redirectToBots);
    $urlRouterProvider.otherwise(redirectTo404);
}

export default AppConfig;
