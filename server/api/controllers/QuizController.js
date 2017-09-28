'use strict'

const Controller = require('trails/controller')

module.exports = class QuizController extends Controller {

  addQuiz(request, reply) {
    let quiz = request.payload.quiz;
    quiz['quizsMap'] = [];
    let questions = request.payload.questions;
    for (let i = 0; i < questions.length; i++) {
      quiz['quizsMap'].push({
        questionId: questions[i]
      });
    }
    //console.log(dataArray);
    this.app.orm.Quiz.create(quiz, {
      include: [{
        model: this.app.orm.QuizsMap,
        as: 'quizsMap'
      }]
    }).then((quiz) => {
      console.log("............", quiz);


      reply({
        status: 200,
        message: 'Quiz Has been uploaded successfully'
      })
    });
  }

  updateQuiz(request, reply) {
    let quiz = request.payload.quiz;
    let deletedIds = request.payload.deletedqid;
    let updateIds = request.payload.updatedqid;
    let promise = [];
    let dataArray = [];
    for (let i = 0; i < updateIds.length; i++) {
      dataArray.push({
        questionId: updateIds[i],
        quizId: quiz.id
      })
    }
    console.log(dataArray, deletedIds);
    promise.push(this.app.orm.Quiz.update(quiz, { where: { id: quiz.id } }));
    promise.push(this.app.orm.QuizsMap.destroy({ where: { id: { $in: deletedIds } } }));
    promise.push(this.app.orm.QuizsMap.bulkCreate(dataArray))

    Promise.all(promise).then(function() {
      console.log("qqqqqqqqq");
      reply({
        status: 200,
        message: 'Quiz Has been updated successfully'
      })
    })


  }

  getAllQuiz(request, reply) {
    console.log('here I am', request.query)
    let query = {};
    if (request.query.id !== undefined) {
      if (request.query.association === 'All') {
        query = {
          where: {
            id: request.query.id
          },
          include: [{
            model: this.app.orm.QuizsMap,
            as: "quizsMap",
            include: [{
              model: this.app.orm.QuizQuestions,
              as: "qusetionMap",
              include: [{
                model: this.app.orm.QuizAnswers,
                as: "answersForQuestions"
              }]
            }]
          }]
        }
      } else {
        query = {
          where: {
            id: request.query.id
          },
          include: [{
            model: this.app.orm.QuizsMap,
            as: "quizsMap",
          }]
        }
      }
    } else {
      if (request.query.association === 'All') {
        query = {
          include: [{
            model: this.app.orm.QuizsMap,
            as: "quizsMap",
            include: [{
              model: this.app.orm.QuizQuestions,
              as: "qusetionMap",
              include: [{
                model: this.app.orm.QuizAnswers,
                as: "answersForQuestions"
              }]
            }]
          }]
        }
      } else {
        query = {
          include: [{
            model: this.app.orm.QuizsMap,
            as: "quizsMap",
          }]
        }
      }
    }
    this.app.orm.Quiz.findAll(query)
      .then((response) => {
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
        as: 'quizsMap',
        model: this.app.orm.QuizsMap,
        include: [{
          model: this.app.orm.QuizQuestions,
          as: "qusetionMap",
          include: [{
            model: this.app.orm.QuizAnswers,
            as: "answersForQuestions"
          }]
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
        },
        include: [{
          as: 'quizsMap',
          model: this.app.orm.QuizsMap,
          include: [{
            as: 'qusetionMap',
            model: this.app.orm.QuizQuestions,
          }]
        }]
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
        as: 'quizsMap',
        model: this.app.orm.QuizsMap,
        include: [{
          as: 'qusetionMap',
          model: this.app.orm.QuizQuestions,
          include: [{
            model: this.app.orm.QuizAnswers,
            as: "answersForQuestions"
          }]
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

  delete(request, reply) {
    console.log(request.query);
    this.app.orm.Quiz.destroy({
      where: {
        id: request.query.id
      }
    }).then((res) => {
      reply({ status: 200, message: 'Request successfully completed.', data: {} })
    })
  }

}
