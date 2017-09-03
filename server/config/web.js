/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */
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
      cors: {
        "origin": [
          "http://localhost:5000"
        ],
        "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
      },
    }
  },
  host: process.env.HOST || '0.0.0.0'
}
