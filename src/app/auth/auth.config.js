function AuthConfig($facebookProvider, AppConstants) {
    'ngInject';

    $facebookProvider.setAppId(AppConstants.facebook.appId);

    $facebookProvider.setVersion('v2.6');

    $facebookProvider.setCustomInit({
        status: true,
        cookie: true,
        xfbml: true
    });

    $facebookProvider.setPermissions(
        AppConstants.facebook.permissions.join(',')
    );
}

export default AuthConfig;