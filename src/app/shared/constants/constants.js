import __ENV from '../../../../.env';

const AppConstants = {
    app: {
        name: 'Mr. Reply'
    },

    jwtKey: 'jwtToken',

    api: __ENV.API_URL,

    facebook: {
        appId: __ENV.FACEBOOK_APP_ID,
        permissions: [
            'email',
            'public_profile',
            'manage_pages',
            'pages_messaging',
            'pages_messaging_subscriptions'
        ]
    },

    stripe: {
        publicId: __ENV.STRIPE_PUBLIC_KEY
    }
};

export default AppConstants;
