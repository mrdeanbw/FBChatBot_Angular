class AuthCtrl {
    constructor(toaster, FlashBag, $facebook, UserService, $state) {
        'ngInject';

        this._$state = $state;
        this._toaster = toaster;
        this._FlashBag = FlashBag;
        this._$facebook = $facebook;
        this._UserService = UserService;

        if ($state.current.name == 'app.logout') {
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
                return this._$facebook.logout().then(() => this._appLogout());
            }

            // Otherwise, just log him out of our app.
            this._appLogout();
        });
    }

    _appLogout() {
        this._UserService.logout();
        this._FlashBag.add("info", "Logged Out!", "You have successfully logged out.");
        this._$state.go("login", null, {reload: true});
    }

    _handleFacebookResponse(response) {
        // user already connected
        if (response.status === 'connected') {
            let accessToken = response.authResponse.accessToken;
            return this._UserService.login(accessToken).then(
                () => this._$state.go('app.dashboard.overview')
            );
        }

        // Unauthorized.
        if (response.status === 'not_authorized') {
            return this._toaster.pop('error', "Login Failed!", "Facebook Authorization has failed!");
        }

        this._toaster.pop('warning', "Login Required!", "Please login into Facebook to continue!");
    }
}

export default AuthCtrl;