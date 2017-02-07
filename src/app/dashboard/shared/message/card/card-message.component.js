class CardController {
    constructor(MessageHelpers) {
        'ngInject';

        this._MessageHelpers = MessageHelpers;

        this.MAX_BUTTONS = 3;
        this.MAX_TITLE_LENGTH = 80;
        this.MAX_SUBTITLE_LENGTH = 80;
    }

    addButton() {
        let button = {
            title: 'New Button',
            url: '',
            actions: {
                add_tags: [],
                remove_tags: [],
                subscribe_sequences: [],
                unsubscribe_sequences: []
            }
        };

        this._MessageHelpers.addMessage(this.message.buttons, button);
        this._MessageHelpers.openButtonModal(this.message.button, button);
    }

    imageChanged(file) {
        this.message.file = file;
    }

}

export default{
    templateUrl: 'dashboard/shared/message/card/card-message.html',
    bindings: {message: '<'},
    controller: CardController
}
