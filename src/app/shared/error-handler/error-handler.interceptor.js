function ErrorHandlingInterceptor(AppConstants, $injector, toaster, FlashBag, JwtService, $q) {
    'ngInject';

    let _isApiRoute = url => url.indexOf(AppConstants.api) === 0;

    let responseError =

            rejection => {

                if (!rejection || !rejection.config || !_isApiRoute(rejection.config.url)) {
                    return $q.reject(rejection);
                }

                var defer = $q.defer();

                // Not found
                if (rejection.status == 404) {
                    $injector.get('$state').go('app.404');
                }

                // Server Error
                if (rejection.status == 500) {
                    $injector.get('$state').go('app.500');
                }

                // Validation Error
                if (rejection.status == 422) {
                    for (let errorKey in rejection.data.errors) {
                        for (let error of rejection.data.errors[errorKey]) {
                            toaster.pop('error', "Validation Error", error);
                            break;
                        }
                        break;
                    }
                }

                // Unauthorized.
                if (rejection.status == 401) {
                    FlashBag.warning("Please login to proceed!");
                    JwtService.destroy();
                    $injector.get('$state').go('app.login');
                }

                defer.reject(rejection);
                return defer.promise;
            };


    return { responseError };
}


export default ErrorHandlingInterceptor;
