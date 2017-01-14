angular.module('dashboard').component('mainMenu', {

    templateUrl: "/templates/dashboard/build/main-menu.html",

    bindings: {
        MAX_BUTTON_COUNT: '@',
        mainMenu: '<'
    },


    controller: function (toaster) {
        var self = this;

        self.MAX_BUTTON_COUNT = 5;

        self.update = function () {
            removeParent(self.mainMenu);
            self.mainMenu.put().then(function (mainMenu) {
                toaster.pop("success", "Saved Successfully!");
                self.mainMenu = mainMenu;
            });
        };

    }

});
