'use strict'
const Model = require('trails-model')
/**
 * User
 *
 * @description A User model
 */
module.exports = class Users extends Model {
  static config(app, Sequelize) {
    return {
      migrate: 'alter',
      store: 'mysql',
      options: {
        classMethods: {
          associate: (models) => {
            models.Users.belongsTo(models.Roles, {
              as: 'roleForUser',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              foreignKey: {
                allowNull: false
              }
            })
            models.Users.hasMany(models.QualifiedQuizs, {
              as: 'qualifiedquizForUser',
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
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isagreeterms: {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
      }
    }
  }
}
