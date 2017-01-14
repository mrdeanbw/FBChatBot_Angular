var auth = angular.module('auth');

auth.config(['$stateProvider', function ($stateProvider) {

    var loginState = {
        name: 'login',
        url: '/login',
        component: 'login'
    };

    var logoutState = {
        name: 'logout',
        url: '/logout',
        template: ' ',
        controller: function (AuthService, $state, FlashBag, $facebook) {

            var appLogout = function () {
                AuthService.logout();
                FlashBag.add("info", "Logged Out!", "You have successfully logged out.");
                $state.go("login");
            };

            $facebook.getLoginStatus().then(function (response) {
                if (response.status === 'connected') {
                    $facebook.logout().then(function () {
                        appLogout();
                    });
                } else {
                    appLogout();
                }
            });

        }
    };

    var chooseBot = {
        name: 'choose-bot',
        url: '/choose-bot',
        component: 'chooseBot',
        resolve: {
            pages: function (Pages) {
                return Pages.getList();
            }
        }
    };

    var disabledBots = {
        name: 'disabled-bots',
        url: '/disabled-bots',
        component: 'disabledBots',
        resolve: {
            bots: function (Pages) {
                return Pages.getList({ disabled: true })
            },
            activeBots: function (Pages) {
                return Pages.getList();
            }
        }
    };

    var createBotState = {
        name: 'create-bot',
        url: '/create-bot',
        component: 'createBot',
        resolve: {

            remotePages: function (Pages) {
                return Pages.getList({ remote: true }).then(function (pages) {
                    return pages;
                }, function (pages) {
                    return pages;
                });
            },

            activeBots: function (Pages) {
                return Pages.getList();
            },

            disabledBots: function (Pages) {
                return Pages.getList({ disabled: true })
            }
        }
    };

    $stateProvider.state(loginState);
    $stateProvider.state(logoutState);
    $stateProvider.state(chooseBot);
    $stateProvider.state(disabledBots);
    $stateProvider.state(createBotState);
}]);

