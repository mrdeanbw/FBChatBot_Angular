function extractDomain(url) {
    let domain;

    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

function getJwtToken(options, jwtHelper, UserService) {
    'ngInject';

    // If we are requesting a HTML page, or there is no token.
    if ((options && options.url.substr(options.url.length - 5) == '.html') || !UserService.tokenExists()) {
        return null;
    }

    var token = UserService.jwtToken;

    if (jwtHelper.isTokenExpired(token)) {
        return UserService.refreshToken().then(() => UserService.jwtToken)
    }

    return token;
}


function JwtConfig($httpProvider, jwtOptionsProvider, jwtInterceptorProvider, AppConstants) {
    'ngInject';

    var apiDomain = extractDomain(AppConstants.api);

    jwtOptionsProvider.config({
        whiteListedDomains: [apiDomain],
        tokenGetter: getJwtToken
    });

    jwtInterceptorProvider.forceHeadersUpdate = true;
    $httpProvider.interceptors.push('jwtInterceptor');
}


export default JwtConfig;