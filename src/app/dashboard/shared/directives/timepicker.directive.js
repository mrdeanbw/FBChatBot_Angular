function TimepickerDirective($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            let $elem = $(elem);

            let options = attrs['timepicker-options'] || {};

            options.icons = {
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down'
            };

            $timeout(() => $elem.timepicker(options));
        }
    }
}

export default TimepickerDirective;