class UserService {

    constructor(JwtService, AppConstants, $http, $q, Restangular, $rootScope) {
        'ngInject';

        this._$q = $q;
        this._$http = $http;
        this._JWTService = JwtService;
        this._$rootScope = $rootScope;
        this._Restangular = Restangular;
        this._AppConstants = AppConstants;

        this.current = null;
    }

    login(facebookAccessToken) {
        return this._Restangular
            .all('users/login')
            .post({token: facebookAccessToken})
            .then(
                user => {
                    this.current = user;
                    this._$rootScope.$broadcast('user:changed', this.current);
                    this._JWTService.save(user.token);
                    return user;
                },
                err => {
                    this.current = null;
                    this._$rootScope.$broadcast('user:changed', this.current);
                    return null;
                }
            );
    }

    logout() {
        this.current = null;
        this._$rootScope.$broadcast('user:changed', this.current);
        this._JWTService.destroy();
    }

    // @todo replace with restangular unauthorized interceptor https://gist.github.com/germanolleunlp/e3e80113626d8c5520b7
    refreshToken() {
        return this._$http({
            url: `${this._AppConstants.api}/users/refresh-token`,
            skipAuthorization: true,
            method: 'POST',
            headers: {Authorization: 'Bearer ' + this._JWTService.get()}
        }).then(
            response => {
                this.current = response.data;
                this._$rootScope.$broadcast('user:changed', this.current);
                this._JWTService.save(response.data.token)
            },
            err => {
                this.current = null;
                this._$rootScope.$broadcast('user:changed', this.current);
                this._JWTService.destroy()
            }
        );
    }

    tokenExists() {
        return this._JWTService.exists();
    }

    get jwtToken() {
        return this._JWTService.get();
    }

    loginStatus() {
        let deferred = this._$q.defer();

        // check for JWT token
        if (!this.tokenExists()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);
            return deferred.promise;
        }

        return this._Restangular
            .one('users/current')
            .get()
            .then(
                user => {
                    this.current = user;
                    this._$rootScope.$broadcast('user:changed', this.current);
                    return deferred.resolve(true);
                },
                () => {
                    this.current = null;
                    this._$rootScope.$broadcast('user:changed', this.current);
                    this._JWTService.destroy();
                    return deferred.resolve(false);
                }
            );
    }

    ensureAuthIs(bool) {
        let deferred = this._$q.defer();
        this.loginStatus().then(authValid => deferred.resolve(authValid === bool));
        return deferred.promise;
    }

}

export default UserService;