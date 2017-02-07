class ButtonController {
    constructor(MessageHelpers) {
        'ngInject';
        this._MessageHelpers = MessageHelpers;
    }

    openButtonModal() {
        this._MessageHelpers.openButtonModal(this.container, this.message);
    }
}

export default{
    templateUrl: 'dashboard/shared/message/button/button-message.html',
    bindings: {message: '<', container: '<'},
    controller: ButtonController
}
