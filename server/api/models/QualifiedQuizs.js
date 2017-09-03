'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class QualifiedQuizs extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            models.QualifiedQuizs.belongsTo(models.Quiz, {
              as: 'quizForQualifying',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'quizId'
              }
            })
            models.QualifiedQuizs.hasMany(models.AttemptedQuizs, {
              as: 'attemptForQualifyQuizs',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'qualifyQuizId'
              }
            })
          }
        }
      }
    }
  }
  static schema(app, Sequelize) {
    return {}
  }

}
