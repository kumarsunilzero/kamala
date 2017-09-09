'use strict'

const Controller = require('trails/controller')

module.exports = class QuizController extends Controller {

  getAllQuiz(request, reply) {
    console.log('here I am')
    this.app.orm.Quiz.findAll({
      include: [{
        model: this.app.orm.QuizQuestions,
        as: "questionsForQuiz",
        include: [{
          model: this.app.orm.QuizAnswers,
          as: "answersForQuestions"
        }]
      }]
    }).then((response) => {
      reply({ status: 200, message: 'Request successfully completed.', data: response })
    })
  }

  getQuiz(request, reply) {
    console.log(request.query)
    this.app.orm.Quiz.findAll({
      where: {
        id: request.query.id
      },
      include: [{
        model: this.app.orm.QuizQuestions,
        as: "questionsForQuiz",
        include: [{
          model: this.app.orm.QuizAnswers,
          as: "answersForQuestions"
        }]
      }]
    }).then((response) => {
      this.app.orm.QualifiedQuizs.findOne({
        where: {
          UserId: request.query.userid,
          quizId: request.query.id
        },
      }).then((res) => {
        reply({ status: 200, data: { quiz: response, qualifiedquiz: res } });
      })
    })
  }

  submitQuiz(request, reply) {
    //console.log(request.payload);
    this.app.orm.AttemptedQuizs.create(request.payload, {
      include: [{
        model: this.app.orm.AttemptedQuizsAnswer,
        as: 'answersForAttemptedQuizs',
      }]
    }).then((res) => {
      reply({ status: 200, data: {}, message: 'Quiz Details Submitted successfully' })
    }).catch((error) => {
      console.log(error);
    });
  }

  getQuizStats(request, reply) {
    console.log("rr")
    this.app.orm.QualifiedQuizs.findOrCreate({
      where: {
        UserId: request.query.userid,
        quizId: request.query.id
      },
      defaults: {
        UserId: request.query.userid,
        quizId: request.query.id
      }
    }).spread((obj, isCreated) => {
      //if (isCreated) {
      console.log('dddd', isCreated)
      //} else {
      this.app.orm.Quiz.findOne({
        where: {
          id: request.query.id
        }
      }).then((quiz) => {
        this.app.orm.Users.findAll({
          include: [{
            model: this.app.orm.QualifiedQuizs,
            as: "qualifiedquizForUser",
            where: {
              quizId: request.query.id
            },
            include: [{
              model: this.app.orm.AttemptedQuizs,
              as: "attemptForQualifyQuizs",
            }]
          }]
        }).then((allquiz) => {
          reply({ status: 200, data: { quiz: quiz, users: allquiz } })
        })
      })
      //}
    }).catch((error) => {
      console.log(error);
    });
  }

  getQuizResults(request, reply) {
    console.log('request', request.query.id);
    this.app.orm.Quiz.findOne({
      where: {
        id: request.query.id
      },
      include: [{
        model: this.app.orm.QuizQuestions,
        as: "questionsForQuiz",
        include: [{
          model: this.app.orm.QuizAnswers,
          as: "answersForQuestions"
        }]
      }]
    }).then((response) => {
      this.app.orm.QualifiedQuizs.findAll({
        where: {
          UserId: request.query.userid,
          quizId: request.query.id
        },
        include: [{
          model: this.app.orm.AttemptedQuizs,
          as: "attemptForQualifyQuizs",
          include: [{
            model: this.app.orm.AttemptedQuizsAnswer,
            as: "answersForAttemptedQuizs",
          }]
        }]
      }).then((result) => {
        reply({
          status: 200,
          data: { quiz: response, result: result }
        })
      })
    })
  }
}
