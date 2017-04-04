class MessageHelpers {
    constructor(AppHelpers, lodash, Modals, $timeout, $filter) {
        'ngInject';
        this._lodash = lodash;
        this._Modals = Modals;
        this._$timeout = $timeout;
        this._$filter = $filter;
        this._AppHelpers = AppHelpers;
    }

    addMessage(container, message) {
        let lastReadOnlyBlock = this._lodash.findLastIndex(container, message => message.readonly);
        let insertAt = lastReadOnlyBlock === -1 ? container.length : lastReadOnlyBlock;
        this._AppHelpers.insertIntoArray(container, insertAt, message);
    }

    canMoveNext(container, message) {
        let index = container.indexOf(message);
        return index !== -1 && index < container.length - 1 && !message.readonly && !container[index + 1].readonly;
    }

    moveNext(container, message) {
        if (this.canMoveNext(container, message)) {
            let index = container.indexOf(message);
            this._AppHelpers.swapArrayElements(container, index, index + 1);
        }
    }

    canMovePrevious(container, message) {
        let index = container.indexOf(message);
        return index > 0 && !container[index - 1].readonly && !message.readonly;
    }

    movePrevious(container, message) {
        if (this.canMovePrevious(container, message)) {
            let index = container.indexOf(message);
            this._AppHelpers.swapArrayElements(container, index - 1, index);
        }
    }

    removable(container, message) {
        let index = container.indexOf(message);
        return (index !== -1 && !message.readonly);
    }

    openDeleteModal(container, message, cardContainerHashkey) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/delete.modal.html',
            inputs: {message},
            controller: this._confirmDeleteModal,
            cb: confirmed => {
                if (confirmed) {
                    this._remove(container, message);
                    if (cardContainerHashkey) {
                        this._$timeout(() => {
                            let hashkey = this._$filter('normalizedHashkey')(cardContainerHashkey.$$hashKey);
                            console.log('#carousel_' + hashkey);
                            angular.element('#carousel_' + hashkey).carousel(0)
                        });
                    }
                }
            }
        });
    }

    _remove(container, message) {
        if (this.removable(container, message)) {
            let index = container.indexOf(message);
            container.splice(index, 1);
        }
    }

    _confirmDeleteModal($scope, close, message) {
        'ngInject';
        $scope.message = message;
        $scope.delete = () => close(true, 500);
        $scope.cancel = () => close(false, 500);
    }

    openButtonModal(container, button, isMainMenuButton = false) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/button/button.modal.html',
            inputs: {button, isMainMenuButton},
            controller: this._buttonModal,
            cb: remove => {
                if (remove) {
                    this._remove(container, button);
                }
            }
        });
    }

    _buttonModal($scope, close, button, isMainMenuButton) {
        'ngInject';
        $scope.button = button;
        $scope.isMainMenuButton = isMainMenuButton;
        $scope.delete = () => close(true, 500);
    }

}

export default MessageHelpers;