const express = require('express');
const {join} = require('path');
const {v4: uuidv4} = require('uuid');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const publicDir = join(__dirname, 'public');
const app = express();

app
  .set('view engine', 'ejs')
  .set('views', join(__dirname, 'views'))
  .use(express.static(publicDir))
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
  .use(require('./middleware/auth').user);

if (process.env.NODE_ENV === 'development') {
  const livereload = require('livereload');
  const connectLiveReload = require('connect-livereload');

  const liveReloadServer = livereload.createServer();

  liveReloadServer.watch(publicDir);

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 10);
  });

  app.use(connectLiveReload());
}

app.use('/', require('./routers'));

module.exports = app;
