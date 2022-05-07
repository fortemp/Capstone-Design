const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const expressSession = require('express-session');
const helmet = require('helmet');
const port = '3001';
const MySqlStore = require('express-mysql-session')(expressSession);

const roomRouter = require('./routes/room');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const morgan = require('morgan');
const passport = require('passport')
const passportConfig = require('./passport')
const Socket = require('./socketio/socket');
const models = require('./models/index');

models.sequelize.sync({force: false, alter: false,timezone: "+09:00" } )//true로하면 모델 수정 가능, 단 데이터 전부 지워짐.
    .then(()=>
    {
        console.log('db연결 성공');
    })
    .catch((err)=>
    {
        console.log(err);
    });

const sessionMid = expressSession({
  saveUninitialized:true,
  HttpOnly:true,
  resave:true,
  secret: "secrettt",
  cookie:{maxAge:86400000},//세션 지속시간 30분
  store:new MySqlStore({
    host:'localhost',
    port: "3306",
    user: "root",
    password: process.env.MYSQLPASSWORD,
    database: 'capstone'//db이름은 임시로 capstone으로 해놓았습니다. 변경하셔도 무관.
  })
})


app.use(helmet());
app.use(morgan('tiny'));//넘쳐나는 get, post 로그들이 보기 싫다면 이 라인을 주석처리 해주세요. 로그용 모듈임.
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(sessionMid);
app.use(passport.initialize())
app.use(passport.session());
passportConfig();
app.use('/api/room',roomRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',postRouter);



  
const server = app.listen(port, ()=>{
  console.log(`${port}번 포트에서 돌아가는중`)
})

Socket(server,app,sessionMid);//socketio에서 익스프레스, 세션 미들웨어를 사용하도록 한다.
