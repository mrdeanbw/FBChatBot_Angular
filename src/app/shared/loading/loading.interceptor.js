function LoadingInterceptor($rootScope, $q) {
    'ngInject';

    let xhrRequests = 0;

    let _isLoading = () => xhrRequests > 0;

    let _updateLoadingStatus = () => $rootScope.loading = _isLoading();

    let request = config => {
        xhrRequests++;
        _updateLoadingStatus();

        return config;
    };

    let requestError = rejection => {
        xhrRequests--;
        _updateLoadingStatus();
        return $q.reject(rejection);
    };

    let response = response => {
        xhrRequests--;
        _updateLoadingStatus();
        return response;
    };

    let responseError = rejection => {
        xhrRequests--;
        _updateLoadingStatus();
        return $q.reject(rejection);
    };

    return {
        request,
        requestError,
        response,
        responseError
    }
}


export default LoadingInterceptor;



