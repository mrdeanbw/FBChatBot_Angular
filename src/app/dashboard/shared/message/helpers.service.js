class MessageHelpers {
    constructor(AppHelpers, lodash, Modals) {
        'ngInject';
        this._lodash = lodash;
        this._Modals = Modals;
        this._AppHelpers = AppHelpers;
    }

    addMessage(container, message) {
        let lastReadOnlyBlock = this._lodash.findLastIndex(container, message => message.readonly);
        let insertAt = lastReadOnlyBlock === -1 ? container.length : lastReadOnlyBlock;
        this._AppHelpers.insertIntoArray(container, insertAt, message);
    }

    canMoveNext(container, message) {
        let index = container.indexOf(message);
        return index !== -1 && index < container.length - 1 && !container[index + 1].readonly;
    }

    moveNext(container, message) {
        if (this.canMoveNext(container, message)) {
            let index = container.indexOf(message);
            this._AppHelpers.swapArrayElements(container, index, index + 1);
        }
    }

    canMovePrevious(container, message) {
        let index = container.indexOf(message);
        return index > 0 && !container[index - 1].readonly;
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

    openDeleteModal(container, message) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/delete.modal.html',
            controller: this._confirmDeleteModal,
            cb: confirmed => {
                if (confirmed) {
                    this._remove(container, message);
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

    _confirmDeleteModal($scope, close) {
        'ngInject';

        $scope.delete = () => close(true, 500);
        $scope.cancel = () => close(false, 500);
    }


    openButtonModal(container, button, isMainMenuButton = false) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/button/button.modal.html',
            inputs: {button, isMainMenuButton},
            controller: this._buttonModal,
            cb: (keep) => {
                if (!keep) {
                    this._remove(container, button);
                }
            }
        });
    }

    _buttonModal($scope, close, button, isMainMenuButton) {
        'ngInject';
        $scope.isMainMenuButton = isMainMenuButton;
        if (isMainMenuButton) {
            button.main_action = button.url ? 'url' : 'template';
        }
        $scope.button = button;
        $scope.save = () => close(true, 500);
        $scope.delete = () => close(false, 500);
    }

}

export default MessageHelpers;