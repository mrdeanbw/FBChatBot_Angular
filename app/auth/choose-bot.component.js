angular.module('auth').component('chooseBot', {

    templateUrl: "/templates/auth/choose-bot.html",

    bindings: { pages: '=' },

    controller: function ($state) {
        if (!this.pages.length) {
            return $state.go("create-bot");
        }
    }

});

