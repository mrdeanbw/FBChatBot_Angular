class AuthController {
    constructor(toaster, FlashBag, $facebook, UserService, $injector) {
        'ngInject';

        this._$injector = $injector;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._$facebook = $facebook;
        this._UserService = UserService;

        if (this._$injector.get('$state').current.name == 'app.logout') {
            return this._logout();
        }
    }

    login() {
        this._$facebook.login().then(
            (res) => this._handleFacebookResponse(res)
        );
    }

    _logout() {
        this._$facebook.getLoginStatus().then((response) => {
            // If the user is logged in using Facebook, log him out.
            // Then log him out of our app.
            if (response.status === 'connected') {
                this._$facebook.logout().then(() => this._appLogout());
                return;
            }
            // Otherwise, just log him out of our app.
            this._appLogout();
        });
    }

    _appLogout() {
        this._UserService.logout();
        this._FlashBag.info("Logged Out!", "You have successfully logged out.");
        this._$injector.get('$state').go("app.login");
    }

    _handleFacebookResponse(response) {
        // user already connected
        if (response.status === 'connected') {
            let accessToken = response.authResponse.accessToken;
            this._UserService.login(accessToken).then(
                () => this._$injector.get('$state').go('app.bot.index')
            );
            return;
        }

        // Unauthorized.
        if (response.status === 'not_authorized') {
            this._toaster.pop('error', "Login Failed!", "Facebook Authorization has failed!");
            return;
        }

        this._toaster.pop('warning', "Login Required!", "Please login into Facebook to continue!");
    }
}

export default AuthController;