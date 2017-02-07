import LoadingInterceptor from './loading.interceptor';

function LoadingConfig($httpProvider) {
    "ngInject";

    $httpProvider.interceptors.push(LoadingInterceptor);
}

export default LoadingConfig;