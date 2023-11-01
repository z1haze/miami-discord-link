const express = require('express');
const {v4: uuidv4} = require('uuid');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app
  .set('view engine', 'ejs')
  .use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      }),
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      genid: function () {
        return uuidv4();
      },
      name: 'muoh.sid'
    })
  )
  .use(require('./middleware/auth').user)
  .use('/', require('./routers'));

module.exports = app;
