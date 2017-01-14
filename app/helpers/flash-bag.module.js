var FlashBag = angular.module('FlashBag', []);


// TODO: Support other settings maybe (class, id, duration, show/hide close button, callbacks.. etc)
// TODO: Implement using queue http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/displaying-a-flash-notice-failure-message.html
// TODO: Use state (ui-router) based triggers

FlashBag.factory("FlashBag", function () {

    var factory = {};

    var message = null;

    factory.add = function (type, title, text, duration) {
        message = {
            title: title,
            text: text,
            type: type || 'info',
            duration: duration || 4000
        };
    };

    factory.get = function () {
        var ret = message;
        message = null;
        return ret;
    };

    return factory;
});
