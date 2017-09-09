/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */
var env = require('./env');
var config = env[process.env.NODE_ENV]
module.exports = {

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 3000,

  /**
   * The host to bind the web server to
   */
  options: {
    routes: {
      cors: config.cors
    }
  },
  host: process.env.HOST || '0.0.0.0'
}
