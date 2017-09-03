'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class AttemptedQuizs extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            // models.AttemptedQuizs.belongsTo(models.QualifiedQuizs, {
            //   as: 'qualifiedQuizForAttempt',
            //   onDelete: 'CASCADE',
            //   onUpdate: 'CASCADE',
            //   foreignKey: {
            //     allowNull: false
            //   }
            // })
            models.AttemptedQuizs.hasMany(models.AttemptedQuizsAnswer, {
              as: 'answersForAttemptedQuizs',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'attemptedQuizId'
              }
            })
          }
        }
      }
    }
  }
  static schema(app, Sequelize) {
    return {
      iscomplete: {
        type: Sequelize.BOOLEAN
      },
      attemptedon: {
        type: Sequelize.DATE
      },
      isretake: {
        type: Sequelize.BOOLEAN
      },
      totalscore: {
        type: Sequelize.INTEGER
      },
    }
  }
}
