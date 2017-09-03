'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class Roles extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {}
      }
    }
  }
  static schema(app, Sequelize) {
    return {
      title: {
        type: Sequelize.STRING
      }
    }
  }
}
