import __ENV from '../../.env';

let redirectTo404 = $injector => {
    'ngInject';
    return $injector.get('$state').go('app.404');
};

let redirectToBots = $injector => {
    'ngInject';
    return $injector.get('$state').go('app.bot.index');
};

function AppConfig($locationProvider, $urlRouterProvider, $compileProvider, $logProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('/', redirectToBots);
    $urlRouterProvider.otherwise(redirectTo404);

    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
    if (__ENV.environment != 'local') {
        $compileProvider.debugInfoEnabled(false);
        $logProvider.debugEnabled(false);
    }
}

export default AppConfig;
