'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class AttemptedQuizsAnswer extends Model {
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
      quizmapid: {
        type: Sequelize.INTEGER
      },
      option: {
        type: Sequelize.INTEGER
      }
    }
  }
}
