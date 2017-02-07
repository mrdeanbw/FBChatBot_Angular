import ErrorHandlingInterceptor from './error-handler.interceptor';

function ErrorHandlerConfig($httpProvider) {
    "ngInject";

    $httpProvider.interceptors.push(ErrorHandlingInterceptor);
}

export default ErrorHandlerConfig;