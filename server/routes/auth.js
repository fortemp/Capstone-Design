const express = require('express');
const router = express.Router();
const {User} = require('../models/User')
const passport = require('passport');
const { is } = require('express/lib/request');

//로그인
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,message)=>{
        if(err){
            console.log(err);
        }
        if(!user){
            //unauthorized 헤더:401
            return res.status(401).json({success:false,message})
        }
        
        return req.logIn(user,(loginError)=>{
            if(loginError){
                console.log(err);
                return next(loginError)
            }
            console.log('로그인 성공')
            return res.status(200).json({success:true})
        })
        
    })(req,res,next);
})
//회원가입
router.post('/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo)=>{
        if(err){
            return res.status(400).json({success:false,err})
        }else{
            return res.status(200).json({success:true});
        }
    })
})

router.get('/logout',(req,res)=>{
    if(req.isAuthenticated())
    {
        req.logout();
        req.session.destroy();
        return res.status(200).json({success:true})
    }else{
        return res.status(400).json({success:false,message:"not authenticated"})
    }
})

//로그인한 사용자의 브라우저에게 로그인여부와 정보를 보냄
router.get('/auth',(req,res)=>{
    const status = req.isAuthenticated() === true ? 200 : 401
    let user = null

    if(req.isAuthenticated()){
        user = {_id:req.user._id,name:req.user.name, email:req.user.email,
            money:req.user.money, image: req.user.image}
    }

    res.status(status).json({auth:req.isAuthenticated(),user})
})


module.exports = router;