'use strict'

const Controller = require('trails/controller')

module.exports = class QuestionsController extends Controller {

  getAllQuestions(request, reply) {
    console.log('here I am')
    const query = {};
    if (request.query.id !== undefined) {
      query.id = request.query.id;
    }
    this.app.orm.QuizQuestions.findAll({
      where: query,
      include: [{
        model: this.app.orm.QuizAnswers,
        as: "answersForQuestions"
      }]
    }).then((response) => {
      reply({ status: 200, message: 'Request successfully completed.', data: response })
    })

  }

  add(request, reply) {
    let data = request.payload;
    console.log(data);
    let promise = [];
    //for (let i = 0; i < data.length; i++) {
    this.app.orm.QuizQuestions.create(data[0], {
      include: {
        model: this.app.orm.QuizAnswers,
        as: "answersForQuestions"
      }
    });
    //} //

    //Promise.all(promise).then(function(res) {
    //reply({ status: 200, message: 'Request successfully completed.', data: res })
    //})
  }

  update(request, reply) {
    let data = request.payload;
    //for (let i = 0; i < data.length; i++) {
    let promise = [];
    promise.push(this.app.orm.QuizQuestions.update(data[0], {
      where: {
        id: data[0].id
      }
    }))
    for (let i = 0; i < data[0].answersForQuestions.length; i++) {
      if (data[0].answersForQuestions[i].id !== undefined) {

        promise.push(this.app.orm.QuizAnswers.update({
          where: {
            id: data[0].answersForQuestions[i].id
          }
        }))
      } else {
        promise.push(this.app.orm.QuizAnswers.create({
          title: data[0].answersForQuestions[i].title,
          iscorrectanswer: data[0].answersForQuestions[i].iscorrectanswer,
          QuizQuestionId: data[0].id
        }))
      }
    }
    Promise.all(promise).then(function() {
      reply({ status: 200, message: 'Request successfully completed.', data: {} })
    })
  }

  delete(request, reply) {
    console.log(request.query);
    this.app.orm.QuizQuestions.destroy({
      where: {
        id: request.query.id
      }
    }).then((res) => {
      reply({ status: 200, message: 'Request successfully completed.', data: {} })
    })
  }
}
