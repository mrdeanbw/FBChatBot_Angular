function DatepickerDirective() {
    'ngInject';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs) {
            let $elem = $(elem);
            
            let options = {
                startDate: attrs.startDate || 'today',
                format: attrs.format || 'yyyy-mm-dd',
                onSelect: dateText => scope.$apply(() => ngModel.$setViewValue(dateText)),
                setDate: scope.ngModel
            };

            $elem.datepicker(options);
        }
    }
}

export default DatepickerDirective;