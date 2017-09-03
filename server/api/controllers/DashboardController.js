'use strict'

const Controller = require('trails/controller')

module.exports = class DashboardController extends Controller {

  getUserStats(request, reply) {
    // query for last three best score
    this.app.orm.Users.findOne({
      where: {
        id: request.query.userid
      },
      include: [{
        model: this.app.orm.QualifiedQuizs,
        as: "qualifiedquizForUser",
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 10,
        include: [{
          model: this.app.orm.Quiz,
          as: "quizForQualifying",
        }, {
          model: this.app.orm.AttemptedQuizs,
          as: "attemptForQualifyQuizs",
          order: [
            ['createdAt', 'DESC']
          ],
          limit: 5
        }]
      }]
    }).then((user) => {
      this.app.orm.Users.findOne({
        where: {
          id: request.query.userid
        },
        include: [{
          model: this.app.orm.QualifiedQuizs,
          as: "qualifiedquizForUser",
          order: [
            ['createdAt', 'DESC']
          ],
          include: [{
            model: this.app.orm.AttemptedQuizs,
            as: "attemptForQualifyQuizs",
            order: [
              ['totalscore', 'DESC']
            ],
            limit: 1
          }]
        }]
      }).then((res) => {
        reply({ status: 200, data: { user: user, bestscore: res } })
      })
    })
  }
}
