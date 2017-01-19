var app = angular.module('MrReply');


/** [Directives] **/

window.directives = window.directives || [];
for (var i = 0; i < window.directives.length; i++) {
    app.directive(directives[i].name, directives[i].action);
}

/*
 Use this directive together with ng-include to include a
 template file by replacing the placeholder element
 */
app.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});


/** [Main Controller] **/
app.controller('AppController', ['$scope', '$rootScope', '$location', '$state', '$stateParams', '$transitions', 'AuthService', 'Pages', 'FlashBag', 'toaster', '$facebook', '$timeout', function ($scope, $rootScope, $location, $state, $stateParams, $transitions, AuthService, Pages, FlashBag, toaster, $facebook, $timeout) {

    // App globals
    $scope.app = {
        name: 'Mr. Reply - The best Facebook chat bots platform',
        description: '',
        owner: 'Mr. Reply',
        layout: {
            menuPin: false,
            menuBehind: false
        },
        author: 'Mohamed Elghobaty'
    };

    $transitions.onFinish({}, function () {
        var flashMessage = FlashBag.get();
        if (flashMessage != null) {
            console.log({
                type: flashMessage.type,
                title: flashMessage.title,
                body: flashMessage.text,
                timeout: flashMessage.duration
            });
            $timeout(function () {
                toaster.pop({
                    type: flashMessage.type,
                    title: flashMessage.title,
                    body: flashMessage.text,
                    timeout: flashMessage.duration
                });
            });
        }
        if ($rootScope.page) {
            var now = moment().utcOffset($rootScope.page.bot_timezone * 60);
            angular.module('relativeDate').value('now', now);
        }
    });

    // Checks if the given state is the current state
    $scope.is = function (name) {
        return $state.is(name);
    };

    // Checks if the given state/child states are present
    $scope.includes = function (name) {
        return $state.includes(name);
    };


    var botIdChecker = function ($transition$) {

        return Pages.getList().then(function (pages) {

            if (!pages.length) {
                return $state.target("choose-bot");
            }

            var params = $transition$.params();

            if (params.facebookId) {

                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].facebook_id == params.facebookId) {
                        $rootScope.page = pages[i];
                        return;
                    }
                }

                return $state.target("404");
            }

            $rootScope.page = pages[0];
            return $state.target("dashboard.overview", { facebookId: pages[0].facebook_id });
        });

    };

    var nonAuthenticatedUsersOnly = function () {
        if (AuthService.isAuthenticated()) {
            return $state.target("dashboard.overview");
        }
        return $facebook.getLoginStatus().then(function (response) {
            if (response.status === 'connected') {
                return AuthService.login(response.authResponse.accessToken).then(function () {
                    return $state.go('dashboard.overview');
                });
            }
        });
    };

    var authenticatedUsersOnly = function () {
        if (!AuthService.isAuthenticated()) {
            FlashBag.add("warning", "Login Required!", "Please login to proceed.");
            return $state.target("login");
        }
    };


    $transitions.onBefore({ to: 'dashboard.**' }, botIdChecker);
    $transitions.onBefore({ to: 'choose-bot' }, authenticatedUsersOnly);
    $transitions.onBefore({ to: 'create-bot' }, authenticatedUsersOnly);
    $transitions.onBefore({ to: 'login' }, nonAuthenticatedUsersOnly);
}]);
