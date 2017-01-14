angular.module('auth').component('createBot', {

    templateUrl: "/templates/auth/create-bot.html",

    bindings: { 
        remotePages: '=',
        activeBots: '=',
        disabledBots: '='
    },

    controller: function ($state, Pages, _, $facebook, AuthService) {

        var selectedPages = [];
        var self          = this;

        var getSelectedPagesFacebookIDs = function () {
            return _.map(selectedPages, function (page) {
                return page.facebook_id
            })
        };

        self.isSelected = function (page) {
            return selectedPages.indexOf(page) != -1
        };

        self.toggleSelection = function (page) {
            var index = selectedPages.indexOf(page);
            // Remove page selection
            if (index != -1) {
                selectedPages.splice(index, 1);
                return;
            }

            // Add page selection
            selectedPages.push(page);
        };

        var hasSelectedPages = function () {
            return selectedPages.length > 0;
        };

        self.shouldDisableButton = function () {
            return !hasSelectedPages();
        };

        self.createBots = function () {
            Pages.post({ pageIds: getSelectedPagesFacebookIDs() }).then(function () {
                return $state.go('dashboard.overview', { facebookId: selectedPages[0].facebook_id })
            });
        };

        self.hasBot = function (page) {
            return !!page.id;
        };

        self.refresh = function () {
            Pages.fetchRemote().then(function (response) {
                self.remotePages = response;
            }, function () {
                self.remotePages = null;
            });
        };


        self.login = function () {
            $facebook.login().then(function (response) {
                if (response.status === 'connected') {
                    return AuthService.login(response.authResponse.accessToken).then(function () {
                        return $state.reload();
                    });
                }
                return $state.reload();
            })
        };


    }
});

