function AuthConfig($stateProvider) {
    'ngInject';

    $stateProvider
        
        .state('app.login', {
            url: '/login',
            controller: 'AuthCtrl as $ctrl',
            templateUrl: 'auth/auth.html',
            title: 'Login'
        })

        .state('app.logout', {
            url: '/logout',
            controller: 'AuthCtrl as $ctrl',
            template: ''
        })
}

export default AuthConfig;
