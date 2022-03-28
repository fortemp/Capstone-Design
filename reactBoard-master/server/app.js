const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const expressSession = require('express-session');
const helmet = require('helmet');
const port = process.env.PORT;
const roomRouter = require('./routes/room');
const authRouter = require('./routes/auth');
const morgan = require('morgan');
const passport = require('passport')
const passportConfig = require('./passport')
const mongoStore = require('connect-mongo')
const Socket = require('./socketio/socket');

mongoose
  .connect(process.env.URL, {
  })
  .then(() => {
    console.log("몽고디비 연결됨");
  })
  .catch((err) => {
    console.log(err);
  });
const sessionMid = expressSession({
  saveUninitialized:true,
  HttpOnly:true,
  resave:true,
  secret: process.env.SECRET,
  cookie:{maxAge:86400000},//세션 지속시간 30분
  store:mongoStore.create({
    mongoUrl: process.env.URL
  })
})
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(sessionMid);
app.use(passport.initialize())
app.use(passport.session());
passportConfig();
app.use('/api/room',roomRouter);
app.use('/api/auth',authRouter);

const server = app.listen(port, ()=>{
  console.log(`${port}번 포트에서 돌아가는중`)
})

Socket(server,app,sessionMid);