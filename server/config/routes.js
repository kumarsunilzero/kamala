/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.helloWorld'
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: ['GET'],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  },
  {
    method: ['POST'],
    path: '/api/v1/user/signup/',
    handler: 'DefaultController.registerUser'
  },
  {
    method: ['POST'],
    path: '/api/v1/login/',
    handler: 'DefaultController.login'
  },
  {
    method: ['POST'],
    path: '/api/v1/facebooklogin/',
    handler: 'DefaultController.faceboookLogin'
  },
  {
    method: ['GET'],
    path: '/api/v1/auth/facebook/',
    handler: 'DefaultController.facebookAuth'
  },
  {
    method: ['GET'],
    path: '/api/v1/quizs/',
    handler: 'QuizController.getAllQuiz'
  },
  {
    method: ['GET'],
    path: '/api/v1/quiz/',
    handler: 'QuizController.getQuiz'
  }, {
    method: ['POST'],
    path: '/api/v1/submitquiz/',
    handler: 'QuizController.submitQuiz'
  },
  {
    method: ['GET'],
    path: '/api/v1/quiz/stats/',
    handler: 'QuizController.getQuizStats'
  },
  {
    method: ['GET'],
    path: '/api/v1/quiz/result/',
    handler: 'QuizController.getQuizResults'
  },
  {
    method: ['GET'],
    path: '/api/v1/dashboard/stats/',
    handler: 'DashboardController.getUserStats'
  },
  {
    method: ['POST'],
    path: '/api/v1/quiz/add/',
    handler: 'QuizController.addQuiz'
  },
  {
    method: ['POST'],
    path: '/api/v1/quiz/update/',
    handler: 'QuizController.updateQuiz'
  },
  {
    method: ['DELETE'],
    path: '/api/v1/quiz/delete/',
    handler: 'QuizController.delete'
  },
  {
    method: ['GET'],
    path: '/api/v1/questions/',
    handler: 'QuestionsController.getAllQuestions'
  },
  {
    method: ['POST'],
    path: '/api/v1/question/add/',
    handler: 'QuestionsController.add'
  },
  {
    method: ['POST'],
    path: '/api/v1/question/update/',
    handler: 'QuestionsController.update'
  },
  {
    method: ['DELETE'],
    path: '/api/v1/question/delete/',
    handler: 'QuestionsController.delete'
  }

]
