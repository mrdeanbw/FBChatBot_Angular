class ButtonController {
    constructor(MessageHelpers) {
        'ngInject';
        this._MessageHelpers = MessageHelpers;
        this.$onInit = () => this.mainMenuButton = this.mainMenuButton || false;
    }

    openButtonModal() {
        this._MessageHelpers.openButtonModal(this.container, this.message, this.mainMenuButton);
    }
}

export default{
    templateUrl: 'dashboard/shared/message/button/button-message.html',
    bindings: {message: '<', container: '<', mainMenuButton: '<'},
    controller: ButtonController
}
