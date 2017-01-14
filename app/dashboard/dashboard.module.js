var dashboard = angular.module('dashboard', [
    'ui.router',
    'mgo-angular-wizard',
    'ngFileUpload',
    'ui.select',
    'ngSanitize',
    'NgSwitchery',
    'Modals',
    'nvd3',
    'ngTable',
    'relativeDate',
    'ui.tree'
]);

dashboard.directive('timepicker', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var $elem   = $(elem);
            var options = {};
            if ($elem.data('append-widget-to')) {
                options.appendWidgetTo = $elem.data('append-widget-to');
            }
            if ($elem.data('show-meridian')) {
                options.showMeridian = $elem.data('show-meridian');
            }
            if ($elem.data('minute-step')) {
                options.minuteStep = $elem.data('minute-step');
            } else {
                options.minuteStep = 1;
            }
            options.icons = {
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down'
            };

            $timeout(function () {
                if ($elem.data('default-time')) {
                    options.defaultTime = $elem.data('default-time');
                }
                $elem.timepicker(options);
            });

            if ($elem.data('allow-input-toggle')) {
                $elem.on('focus', function () {
                    $elem.timepicker('showWidget');
                });
            }
        }
    }
});


dashboard.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        if (isNaN(input)) {
            return 'N/A';
        }
        decimals = decimals || 2;
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);


dashboard.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

dashboard.filter('timezoned', function () {
    return function (dateTime, outTimezone, format, inTimezone) {
        if (!dateTime.length) {
            dateTime = undefined;
        }

        format      = format || 'MMMM Do, h:mm a'; // defaultFormat
        outTimezone = outTimezone || 0; // defaults to UTC

        var momentObject;

        if (!inTimezone && !dateTime) {
            momentObject = moment();
        } else {
            inTimezone = inTimezone || 0; // defaults to UTC
            if (angular.isNumber(inTimezone)) {
                var minutes        = inTimezone * 60;
                var hours          = Math.floor(minutes / 60);
                minutes %= 60;
                var timezoneString = "+" + ('0' + hours).substr(-2) + ":" + ('0' + minutes).substr(-2);
                momentObject       = moment(dateTime + timezoneString);
            } else {
                momentObject = moment.tz(dateTime, inTimezone);
            }
        }

        if (angular.isNumber(outTimezone)) {
            momentObject = momentObject.utcOffset(outTimezone * 60);
        } else {
            momentObject = momentObject.tz(outTimezone);
        }

        return momentObject.format(format);
    };
});


dashboard.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

dashboard.filter('normalizedHashKey', function () {
    return function (hashKey) {
        return normaliseHashKey(hashKey);
    }
});


var previewModalController = function (close, $scope, $rootScope, __ENV, $timeout, $element, $window, context, userStatus, Pages, MessagePreviews) {
    $scope.APP_ID = __ENV.FACEBOOK_APP_ID;
    $scope.pageId = $rootScope.page.facebook_id;
    $scope.userId = userStatus.user_id;

    var timeout;

    var sendMessageBlocksIfSubscribed = function () {
        Pages.one($rootScope.page.id).customGET("user-status").then(function (response) {
            if (!response.is_subscribed) {
                timeout = $timeout(sendMessageBlocksIfSubscribed, 500);
                return;
            }
            $timeout.cancel(timeout);
            var copy = angular.copy(context);
            removeParent(copy);
            MessagePreviews($rootScope.page.id).post(copy).then(function () {
                $element.modal('hide');
                close(true, 500);
            }, function () {
                $element.modal('hide');
                close(false, 500);
            });

        });
    };


    var enteredClicked = false;

    $timeout(function () {
        $window.FB.XFBML.parse(document.getElementById('preview-button-container'));
        $window.FB.Event.subscribe('send_to_messenger', function (e) {
            if (e.event == "clicked" && !enteredClicked) {
                enteredClicked = true;
                timeout        = $timeout(sendMessageBlocksIfSubscribed, 500);
            }
        });
    });

};

var deleteModalController = function ($scope, close) {
    $scope.delete = function () {
        close(true, 500);
    };
    $scope.cancel = function () {
        close(false, 500);
    };
};