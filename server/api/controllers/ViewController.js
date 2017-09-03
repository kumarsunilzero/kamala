'use strict'

const Controller = require('trails/controller')

module.exports = class ViewController extends Controller {

  helloWorld(request, reply) {
    reply('Hello Trails.js !')
  }

  addQuiz(request, reply) {
    let dataArray = request.payload;
    console.log(dataArray);
    this.app.orm.Quiz.create(dataArray, {
      include: [{
        model: this.app.orm.QuizQuestions,
        as: 'questionsForQuiz',
        include: [{
          model: this.app.orm.QuizAnswers,
          as: 'answersForQuestions'
        }]
      }]
    }).then((quiz) => {
      console.log("............", quiz);
      reply({
        status: 200,
        message: 'Quiz Has been uploaded successfully'
      })
    });
    // this.app.orm.Quiz.Create(dataArray, { returning: true }, {
    //   include: [this.app.models.QuizQuestions, this.app.models.QuizAnswers]
    // }).then((returnval) => {
    //   console.log("00000", returnval);
    // });
  }
  addRole(request, reply) {
    var dataArray = [{
      title: 'admin'
    }, {
      title: 'superadmin'
    }, {
      title: 'participant'
    }, {
      title: 'guest'
    }];
    this.app.orm.Roles.bulkCreate(dataArray).then((roles) => {
      console.log("............", roles);
    });
  }
  addUser(request, reply) {
    var dataArray = [{
      firstname: 'kamal',
      lastname: 'bhatt',
      email: 'kamalbhatt090@gmail.com',
      password: 'kamalbhatt',
      roleForUserId: 3
    }];
    this.app.orm.Users.bulkCreate(dataArray).then((users) => {
      console.log("............", users);
    });
  }
}
