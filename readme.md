# Mr. Reply Angular 1 Frontend

##Installation
- Copy `.env.example.js` to `.env.js` and fill in Facebook App ID.
```
npm install
node_modules/grunt-cli/bin/grunt concat
node_modules/grunt-cli/bin/grunt connect:server
node_modules/grunt-cli/bin/grunt watch
```
- To be able to test payments, setup add Stripe's public key to `.env.js` file.
