'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class Quiz extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            models.Quiz.hasMany(models.QuizQuestions, {
              as: 'questionsForQuiz',
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
      level: {
        type: Sequelize.STRING
      },
      totaltime: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      totalscore: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      marks: {
        type: Sequelize.INTEGER
      }
    }
  }
}
