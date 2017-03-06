class MainMenuController {
    constructor(toaster, MessageHelpers) {
        'ngInject';

        this._MessageHelpers = MessageHelpers;
        this._toaster = toaster;

        this.MAX_BUTTONS = 5;
    }

    save() {
        this.bot.customPUT(this.bot.main_menu, "main-menu").then((mainMenu)=> {
            this.bot.main_menu = mainMenu;
            this._toaster.pop("success", "Saved Successfully!");
        });
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

        this._MessageHelpers.addMessage(this.bot.main_menu.buttons, button);
        this._MessageHelpers.openButtonModal(this.bot.main_menu.buttons, button, true);
    }

}
export default{
    templateUrl: 'dashboard/build/main-menu/main-menu.html',
    bindings: {bot: '<'},
    controller: MainMenuController
}