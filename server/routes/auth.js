const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport');
const Crypto = require('crypto');
const db = require('../config/db')


//로그인
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,message)=>{
        if(err){
            console.log(err);
        }
        if(!user){
            //unauthorized 헤더:401
            return res.status(200).json({success:false,message})
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
router.post('/register',async (req,res)=>{

    console.log(req.body);
    let object =
    {
        img_url: req.body.image,//임시 이미지(gravatar)
        password: req.body.password,
        name: req.body.name,
        id: req.body.id,//아이디
        email: req.body.email
    };
    try{
        const salt = Crypto.randomBytes(64).toString('base64');//salt생성
        const hash = Crypto.createHash('sha256').update(object.password+salt).digest('hex');//hash생성
        object.salt = salt;
        object.password = hash;
        await User.create(object);
        return res.status(200).json({success:true})
        
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({success:false})
    }
})
//로그아웃
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
        user = {_id:req.user.user_id,name:req.user.name, email:req.user.email,
            point:req.user.point, img_url: req.user.img_url,elo:req.user.elo}
    }

    res.status(status).json({auth:req.isAuthenticated(),user})
})
//회원가입시 아이디 중복확인
router.post('/dupcheck',async (req,res)=>{
    const id = req.body.id
    console.log(id);
    const result = await User.findAll({where:{id}});
    if(result.length>0){
        return res.json({success:true,message:"dup"})
    }else{
        return res.json({success:true,message:"nodup"});
    }
})

router.get('/getuser',async(req,res)=>{
    const user = req.query.user;
    const sql= 'select * from `users` where `name`=?';
    db.query(sql,user, (err,data)=>{
        res.send(data[0]);
    })
})

router.get('/changeimg',async(req,res)=>{
    const url = req.query.url;
    const user = req.query.user;
    const sql= 'update users set img_url=? where name=?';
    db.query(sql,[url,user], (err,data)=>{
        res.send(data);
    })
})


module.exports = router;