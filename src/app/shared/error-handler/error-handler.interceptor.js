function ErrorHandlingInterceptor(AppConstants, $injector, toaster, FlashBag, JwtService, $q) {
    'ngInject';

    let _isApiRoute = url => url.indexOf(AppConstants.api) === 0;

    let responseError =

        rejection => {

            if (!rejection || !rejection.config || !_isApiRoute(rejection.config.url)) {
                return $q.reject(rejection);
            }

            let defer = $q.defer();
            let $state = $injector.get('$state');

            // Not found
            if (rejection.status === 404) {
                $state.go('app.404');
            }

            // Server Error
            if (rejection.status === 500) {
                // $state.go('app.500');
            }

            // Validation Error
            if (rejection.status === 422) {
                for (let errorKey in rejection.data.errors) {
                    for (let error of rejection.data.errors[errorKey]) {
                        toaster.pop('error', "Validation Error", error);
                        break;
                    }
                    break;
                }
            }

            // Bad request error
            if (rejection.status === 400) {
                toaster.pop('error', "Error!", rejection.data.message);
            }

            // Unauthorized.
            if (rejection.status === 401) {
                if ($state.current.name !== 'app.login') {
                    FlashBag.warning("Please login to proceed!");
                }
                JwtService.destroy();
                $state.go('app.login');
            }

            // Forbidding.
            if (rejection.status === 403 && rejection.data && rejection.data.message == 'missing_permissions') {
                if ($state.current.name == 'app.permissions') {
                    toaster.pop('error', "Facebook Permissions needed!", "Don't worry – you are in total control of what your bot does.");
                } else {
                    FlashBag.error("Facebook Permissions needed!", "Don't worry – you are in total control of what your bot does.");
                }
                $state.go('app.permissions');
            }

            defer.reject(rejection);
            return defer.promise;
        };


    return {responseError};
}


export default ErrorHandlingInterceptor;
