angular.module('nl2br', []).filter('nl2br', function () {
    return function (input) {
        if (input !== void 0) {
            return input.replace(/\n/g, '<br />');
        }
    };
});