/* eslint no-console: ["error", { allow: ["error"] }] */

// Internal dependencies
const HttpServer = require('./drivers/http/server');

HttpServer.start().catch((err) => console.error('Something went wrong when running server', err));
