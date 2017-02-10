function DatepickerDirective($timeout) {
    'ngInject';
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=datePicker',
            after: '=?',
            before: '=?'
        },
        link: function (scope, elem, attrs, ngModel) {
            $timeout(() => {
                let $elem = $(elem);
                let options = {
                    startDate: attrs.startDate || 'today',
                    format: attrs.format || 'yyyy-mm-dd',
                    onSelect: dateText => scope.$apply(() => ngModel.$setViewValue(dateText)),
                    setDate: ngModel.$viewValue
                };
                $elem.datepicker(options);
            });
        }
    }
}

export default DatepickerDirective;