function RestangularConfig(RestangularProvider, AppConstants) {
    'ngInject';

    RestangularProvider.setBaseUrl(AppConstants.api);

    RestangularProvider.setResponseExtractor(
        serverResponse => {
            var response = serverResponse.data;
            if (serverResponse.meta) {
                response.meta = serverResponse.meta;
            }
            return response;
        }
    );
}


export default RestangularConfig;