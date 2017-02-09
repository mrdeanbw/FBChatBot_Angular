// TODO: Support other settings maybe (class, id, duration, show/hide close button, callbacks.. etc)
// TODO: Implement using queue http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/displaying-a-flash-notice-failure-message.html
// TODO: Use state (ui-router) based triggers

class FlashBagService {

    constructor() {
        this.message = null;
    }

    static get defaultDuration() {
        return 4000;
    }

    add(type, title, text, duration = FlashBagService.defaultDuration) {
        this.message = {title, text, type, duration};
    }

    info(title, text, duration = FlashBagService.defaultDuration) {
        this.add('info', title, text, duration);
    }

    success(title, text, duration = FlashBagService.defaultDuration) {
        this.add('success', title, text, duration);
    }

    error(title, text, duration = FlashBagService.defaultDuration) {
        this.add('error', title, text, duration);
    }

    warning(title, text, duration = FlashBagService.defaultDuration) {
        this.add('warning', title, text, duration);
    }

    get() {
        let ret = this.message;
        this.message = null;
        return ret;
    }
}

export default FlashBagService;
