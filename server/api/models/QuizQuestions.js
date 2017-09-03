'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class Questions extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            models.QuizQuestions.hasMany(models.QuizAnswers, {
              as: 'answersForQuestions',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false
              }
            })
          }
        }
      }
    }
  }
  static schema(app, Sequelize) {
    return {
      title: {
        type: Sequelize.STRING
      },
      explanation: {
        type: Sequelize.STRING
      }
    }
  }
}
