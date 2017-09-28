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
            models.Quiz.hasMany(models.QuizsMap, {
              as: 'quizsMap',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'quizId'
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
      description: {
        type: Sequelize.STRING
      },
      isApproved: {
        type: Sequelize.BOOLEAN
      }
    }
  }
}
