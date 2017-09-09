'use strict'

module.exports = {
  database: {

    stores: {
      mysql: {
        username: "root",
        password: "root",
        port: 3306,
        database: "mockupquiz",
        host: "127.0.0.1",
        driver: "mysql"
      }
    },
    models: {
      defaultStore: 'mysql',
      migrate: 'alter'
    }
  },
  cors: {
    "origin": [
      "http://localhost:5000"
    ],
    "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
  },
  socialMedia: {
    'facebookAuth': {
      'clientID': '424661704587611', // your App ID
      'clientSecret': '908468856c4338fc076f61f62040c8b7', // your App Secret
      'callbackURL': 'http://localhost:3000/auth/facebook/'
    }
  }
}
