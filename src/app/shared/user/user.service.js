export default class UserService {
    constructor(JwtService, AppConstants, $http, $q, Restangular, $state) {
        'ngInject';

        this._$q = $q;
        this._$http = $http;
        this._$state = $state;
        this._JWTService = JwtService;
        this._Restangular = Restangular;
        this._AppConstants = AppConstants;

        this.current = null;
    }

    login(facebookAccessToken) {
        return this._Restangular
            .all('auth')
            .post({token: facebookAccessToken})
            .then(
                user => {
                    this.current = user;
                    this._JWTService.save(user.token);
                    return user;
                }
            );
    }

    logout() {
        this.current = null;
        this._JWTService.destroy();
    }

    // @todo replace with restangular unauthorized interceptor https://gist.github.com/germanolleunlp/e3e80113626d8c5520b7
    refreshToken() {
        return this._$http({
            url: `${this._AppConstants.api}/auth/token`,
            skipAuthorization: true,
            method: 'POST',
            headers: {Authorization: 'Bearer ' + this._JWTService.get()}
        }).then(
            response => {
                this.current = response.data;
                this._JWTService.save(response.data.token)
            },
            err => this._JWTService.destroy()
        );
    }

    isLoggedIn() {
        let deferred = this._$q.defer();

        // check for JWT token
        if (!this._JWTService.exists()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);
            return deferred.promise;
        }

        return this._Restangular
            .get('auth')
            .then(
                user => {
                    this.current = user;
                    deferred.resolve(true);
                },
                err => {
                    this._JWTService.destroy();
                    deferred.resolve(false);
                }
            );
    }

}