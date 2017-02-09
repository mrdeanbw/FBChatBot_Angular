class Modals {

    constructor(ModalService) {
        'ngInject';

        this._ModalService = ModalService;
    }

    openModal(options) {
        this._ModalService.showModal({
            templateUrl: options.templateUrl,
            controller: options.controller,
            inputs: options.inputs || {},
            appendElement: $('#ModalsContainer')
        }).then(function (modal) {
            modal.element.modal();
            if (options.cb) {
                modal.close.then(options.cb);
            }
        });
    };

    errorModal(title = 'Oops!', message = 'Something went wrong.') {
        this.openModal({
            templateUrl: 'layout/errors/error.modal.html',
            controller: ($scope) => {
                'ngInject';
                $scope.title = title;
                $scope.message = message;
            }
        })
    }


}

export default Modals;