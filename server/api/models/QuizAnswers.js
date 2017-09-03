'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class QuizAnswers extends Model {
  static schema(app, Sequelize) {
    return {
      title: {
        type: Sequelize.STRING
      },
      iscorrectanswer: {
        type: Sequelize.BOOLEAN
      }
    }
  }
}
