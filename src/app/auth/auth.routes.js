function AuthRoutes($stateProvider) {
    'ngInject';

    $stateProvider

        .state('app.login', {
            url: '/login',
            controller: 'AuthController as $ctrl',
            templateUrl: 'auth/auth.html',
            title: 'Login',
            resolve: {
                auth: function (UserService, $state) {
                    'ngInject';
                    return UserService.ensureAuthIs(false).then((match) => {
                        if (!match) {
                            $state.go("app.bot.index");
                        }
                    });
                }
            }
        })

        .state('app.logout', {
            url: '/logout',
            controller: 'AuthController as $ctrl',
            template: '&nbsp;',
            resolve:{
                auth: function (UserService) {
                    'ngInject';
                    return UserService.ensureAuthIs(true);
                }
            }
        })
}

export default AuthRoutes;
