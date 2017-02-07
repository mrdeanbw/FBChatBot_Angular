function PusherConfig(PusherServiceProvider, AppConstants) {
    'ngInject';
    
    PusherServiceProvider.setToken(AppConstants.pusher.publicKey).setOptions({});
}

export default PusherConfig;
