function BtnConfirmDirective(Modals, $state) {
    'ngInject';
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            let title = attrs.confirmTitle || "Are you sure?";
            let message = attrs.confirmMessage || "";
            elem.bind('click', () => {
                Modals.openModal({
                    templateUrl: 'dashboard/views/confirm.modal.html',
                    inputs: {title, message},
                    controller: function ($scope, close, title, message) {
                        'ngInject';
                        $scope.title = title;
                        $scope.message = message;
                        $scope.confirm = () => close(true, 500);
                    },
                    cb: confirmed => {
                        if (confirmed) {
                            let uiState = attrs.confirmedState;
                            let clickAction = attrs.confirmedAction;
                            if (clickAction) {
                                scope.$eval(clickAction);
                            }
                            if (uiState) {
                                $state.go(uiState);
                            }
                        }
                    }
                });
            });
        }
    }
}

export default BtnConfirmDirective;