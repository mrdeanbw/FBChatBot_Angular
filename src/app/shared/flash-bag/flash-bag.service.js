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

    add(title, text, type, duration = FlashBagService.defaultDuration) {
        this.message = {title, text, type, duration};
    }

    info(title, text, duration = FlashBagService.defaultDuration) {
        this.add(title, text, 'info', duration);
    }

    success(title, text, duration = FlashBagService.defaultDuration) {
        this.add(title, text, 'success', duration);
    }

    error(title, text, duration = FlashBagService.defaultDuration) {
        this.add(title, text, 'error', duration);
    }

    warning(title, text, duration = FlashBagService.defaultDuration) {
        this.add(title, text, 'warning', duration);
    }

    get() {
        let ret = this.message;
        this.message = null;
        return ret;
    }
}

export default FlashBagService;
