'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class QuizsMap extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            models.QuizsMap.belongsTo(models.QuizQuestions, {
              as: 'qusetionMap',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'questionId'
              }
            })
            models.QuizsMap.hasOne(models.AttemptedQuizsAnswer, {
              as: 'ansForQues',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false,
                name: 'quizmapid'
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
