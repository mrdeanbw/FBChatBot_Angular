/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


var app = angular.module('MrReply');

// Import variables if present (from env.js)
var env = {};
if (window) {
    Object.assign(env, window.__ENV);
    app.constant('_', window._);
}
app.constant('__ENV', env);


app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/404');

    var error404 = {
        name: '404',
        url: "/404",
        templateUrl: '/templates/errors/404.html'
    };
    var error500 = {
        name: '500',
        url: "/500",
        templateUrl: '/templates/errors/500.html'
    };

    $stateProvider.state(error404);
    $stateProvider.state(error500);
}]);


app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.config(['$facebookProvider', function ($facebookProvider) {
    $facebookProvider.setAppId(__ENV.FACEBOOK_APP_ID);
    $facebookProvider.setVersion('v2.6');
    $facebookProvider.setCustomInit({
        status: true,
        cookie: true,
        xfbml: true
    });
    $facebookProvider.setPermissions('email,public_profile,manage_pages,pages_messaging,pages_messaging_subscriptions');
}]);


app.config(function Config($httpProvider, jwtOptionsProvider, jwtInterceptorProvider, __ENV) {
    
    jwtOptionsProvider.config({
        tokenGetter: ['options', 'jwtHelper', '$localStorage', 'AuthService', function (options, jwtHelper, $localStorage, AuthService) {
            if ((options && options.url.substr(options.url.length - 5) == '.html') || !AuthService.isAuthenticated()) {
                return null;
            }
            var token = AuthService.getToken();
            if (jwtHelper.isTokenExpired(token)) {
                return AuthService.refreshToken().then(function () {
                    return AuthService.getToken();
                });
            }

            return token;
        }],
        whiteListedDomains: [extractDomain(__ENV.API_URL)]
    });

    jwtInterceptorProvider.forceHeadersUpdate = true;
    $httpProvider.interceptors.push('jwtInterceptor');
});

app.config(['RestangularProvider', '__ENV', function (RestangularProvider, __ENV) {
    RestangularProvider.setBaseUrl(__ENV.API_URL);

    RestangularProvider.setResponseExtractor(function (serverResponse, operation) {
        var response = serverResponse.data;
        if (serverResponse.meta) {
            response.meta = serverResponse.meta;
        }
        return response;
    });
}]);