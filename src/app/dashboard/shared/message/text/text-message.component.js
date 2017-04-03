class TextController {
    constructor(MessageHelpers) {
        'ngInject';

        this._MessageHelpers = MessageHelpers;
        this.MAX_LENGTH = 320;
        this.MAX_BUTTONS = 3;
    }

    addButton() {
        let button = {
            title: 'New Button',
            url: '',
            type: 'button',
            messages: [],
            add_tags: [],
            remove_tags: [],
            subscribe_sequences: [],
            unsubscribe_sequences: []
        };

        this._MessageHelpers.addMessage(this.message.buttons, button);
        this._MessageHelpers.openButtonModal(this.message.buttons, button);
    }
}

export default{
    templateUrl: 'dashboard/shared/message/text/text-message.html',
    bindings: {message: '<'},
    controller: TextController
}
