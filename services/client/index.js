global.LOGGER_NAME = 'ucd-lib-client';

const express = require('express');
const {logger, keycloak, middleware, controllers} = require('@ucd-lib/fin-service-utils');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const httpProxy = require('http-proxy');
const config = require('./config');

// the api process (controllers/api.js) runs standalone, on its own port
// (config.api.port); this proxies /api/* to it rather than mounting it
// directly, so the api process can be deployed as its own service later
// (see docs/PORT-PLAN.md Phase 0/7) without another client-side change.
const apiProxy = httpProxy.createProxyServer({
  target: process.env.API_INTERNAL_URL || `http://localhost:${config.api.port}`
});
apiProxy.on('error', (err, req, res) => {
  logger.error('Error proxying to api service', err);
  if( !res.headersSent ) res.status(502);
  res.end('Bad gateway');
});

// create express instance
const app = express();
app.use(middleware.httpTiming());

// parse cookies and add compression
app.use(cookieParser()); 
app.use(compression());


// setup simple http logging
app.use((req, res, next) => {
  res.on('finish',() => {
    logger.info(`${res.statusCode} ${req.method} ${req.protocol}/${req.httpVersion} ${req.originalUrl || req.url} ${req.get('User-Agent') || 'no-user-agent'}`);
  });
  next();
});

// parse application/x-www-form-urlencoded req body
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json req body
app.use(bodyParser.json());

app.use(keycloak.setUser);

/**
 * proxy /api/* to the standalone api process (controllers/api.js)
 */
app.use('/api', (req, res) => apiProxy.web(req, res));

/**
 * setup ark/doi proxy
 */
require('./controllers/identifier')(app);

/**
 * setup sitemap
 */
require('./models/sitemap').middleware(app);

controllers.health.register(app);

/**
 * setup static routes
 */
require('./controllers/static')(app);
 
app.listen(8000, () => {
  logger.info('server ready on port 8000, using: '+config.server.assets);
});