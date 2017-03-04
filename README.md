# Mr. Reply's Angular 1.5 + ES6 Frontend

# Installation

### Prerequisites
- Make sure you have `gulp` installed globally (`npm install -g gulp`)
- Make sure you have `bower` installed globally (`npm install -g bower`)

### Development
1. Clone repo
2. Copy `.env.example.js` to `.env.js`, and configure it properly.
3. `npm install`
4. `bower install`
5. `gulp assets`
6. `gulp`

### Production
1. Clone repo
2. Copy `.env.example.js` to `.env.js`, and configure it properly.
3. `npm install`
4. `bower install --config.interactive=false`
5. `gulp assets`
6. `gulp html`
7. `gulp build`

----------

##### Cleaning up
- `gulp clean:assets` cleans the static assets directories `(build/css)`, `(build/js)` ... etc
- `gulp clean:build` cleans the build directory
- `gulp clean:dist` cleans the dist directory
