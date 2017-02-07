function timepickerDirective($timeout) {
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

            if (options['allow-input-toggle']) {
                alert('add focus listener to timpepicker directive');
                // $elem.on('focus', function () {
                //     $elem.timepicker('showWidget');
                // });
            }
        }
    }
}

export default timepickerDirective;