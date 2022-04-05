const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const crypto = require('crypto');
const User = require('../models/User')

module.exports = () =>
{
    passport.use(new LocalStrategy(
    {
        usernameField:'id',
        passwordField:'password'
    }, 
    async(id,password,done)=>
    {
        try{
            const result = await User.findOne({where:{id}});
            if(result){
                const salt = result.salt;//사용자의 salt값
                const genpass = await crypto.createHash('sha256').update(password+salt).digest('hex');//salt로 해쉬생성
                if(genpass === result.password){//패스워드 비교
                    done(null,result);//로그인이 성공시 유저객체 리턴
                }else{
                    done(null,false,{message:'비밀번호 불일치 또는 미가입자입니다.'});
                }
            }else{
                done(null,false,{message:'비번밀번호 불일치 또는 미가입자입니다.'});
            }
        }catch(err){
            done(err);//에러시 에러 반환
        }
        
    }))
}