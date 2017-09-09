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
      "http://13.126.180.18:5000"
    ],
    "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
  }

}
