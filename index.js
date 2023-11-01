require('dotenv').config();

const express = require('express');
const {v4: uuidv4} = require('uuid');
const {join} = require('path');

const app = express();
const http = require('http').createServer(app);

app
  .set('view engine', 'ejs')
  .use(
    require('express-session')({
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
  .use(express.static(join(__dirname, '../client/public')))
  .use('/', require('./routers'));

http.listen(process.env.APP_PORT, () => {
  console.log(`App running on port http://localhost:${process.env.APP_PORT}`);
});
