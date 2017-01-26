import __ENV from '../../.env';

const AppConstants = {
    api: __ENV.API_URL,
    facebookAppId: __ENV.FACEBOOK_APP_ID,
    stripePublicId: __ENV.STRIPE_PUBLIC_KEY,
    jwtKey: 'jwtToken',
    appName: 'Mr. Reply'
};

export default AppConstants;
