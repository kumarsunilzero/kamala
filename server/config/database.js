/**
 * Database Configuration
 * (app.config.database)
 *
 * Configure the ORM layer, connections, etc.
 *
 * @see {@link http://trailsjs.io/doc/config/database}
 */
var env = require('./env');
var config = env[process.env.NODE_ENV]
module.exports = config.database;
