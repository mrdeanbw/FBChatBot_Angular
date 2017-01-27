class JwtService {
    constructor(AppConstants, $window) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$window = $window;
    }

    save(token) {
        this._$window.localStorage[this._AppConstants.jwtKey] = token;
    }

    get() {
        return this._$window.localStorage[this._AppConstants.jwtKey];
    }

    exists() {
        let token = this.get();
        return token && token.length > 0;
    }

    destroy() {
        this._$window.localStorage.removeItem(this._AppConstants.jwtKey);
    }
}

export default JwtService;
