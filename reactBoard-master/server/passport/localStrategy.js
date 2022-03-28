const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const {User} = require('../models/User')

module.exports = () =>
{
    passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password'
    }, 
    (email,password,done)=>
    {
        User.findOne({email:email},(err,user)=>
        {
            if(err){//에러
                console.log(err);
                done(err);
            }
            
            if(!user){//미가입자
                done(null,false,{message:"비번 불일치 또는 미가입자입니다."})
            }

            //가입자일시에 함수
            user.comparePassword(password,(err,isMatch)=>{

                if(err){//에러
                    console.log(err);
                    done(err)
                }

                if(!isMatch){//비번틀림
                    done(null,false,{message:"비번 불일치 또는 미가입자입니다."})
                }

                //로그인 성공
                done(null,user);
            })
        })

    }))
}