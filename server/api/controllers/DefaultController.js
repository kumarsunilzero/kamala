'use strict'

const Controller = require('trails/controller')
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/controllers}
 * @this TrailsApp
 */
module.exports = class DefaultController extends Controller {

  /**
   * Return some info about this application
   */
  info(request, reply) {
    reply(this.app.services.DefaultService.getApplicationInfo())
  }

  login(request, reply) {
    //console.log("..", request.payload)

    const email = request.payload.username
    const password = request.payload.password

    this.app.orm.Users.findOne({
      where: {
        email: email
      }
    }).then((user) => {
      console.log("---", user);
      if (user === null) {
        reply({ status: 404, message: 'You are not registered With us' })
      } else {
        if (user.password === password) {
          reply({ status: 200, message: 'Logged in successfully', data: user })
        } else {
          reply({ status: 404, message: 'User name and password Incorrect' })
        }

      }
    });


  }

  faceboookLogin(request, reply) {
    let facebookConf = this.app.config.socialMedia.facebookAuth;
    console.log(facebookConf)
    passport.use(new FacebookStrategy({

      // pull in our app id and secret from our auth.js file
      clientID: facebookConf.clientID,
      clientSecret: facebookConf.clientSecret,
      callbackURL: facebookConf.callbackURL

    }, function(token, refreshToken, profile, done) {
      console.log("---", token, refreshToken, profile, done);
    }));
  }

  facebookAuth(request, reply) {
    console.log(request, reply);
  }

  registerUser(request, reply) {
    let insertObj = JSON.parse(JSON.stringify(request.payload));
    console.log(insertObj);
    insertObj["roleForUserId"] = 3;
    this.app.orm.Users.findOrCreate({
      where: { email: insertObj.email },
      defaults: insertObj
    }).spread((obj, flag) => {
      if (flag) {
        reply({
          status: 200,
          message: 'You have been registered successfully'
        })
      } else {

        reply({
          status: 201,
          message: 'You are already Registerd with us.'
        })
      }
    });
  }

}
