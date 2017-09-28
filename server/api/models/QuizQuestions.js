'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class QuizQuestions extends Model {
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

            models.QuizQuestions.hasMany(models.QuizsMap, {
              as: 'questionsMap',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'questionId'
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
      },
      subject: {
        type: Sequelize.STRING
      },
      marks: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      negativemark: {
        type: Sequelize.INTEGER
      },
      totaltime: {
        type: Sequelize.INTEGER
      }
    }
  }
}
