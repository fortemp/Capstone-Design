const express = require('express');
const router = express.Router();
const Room = require('../models/Room')
const db = require('../config/db')


//방들 가져오기
router.get('/getrooms',async (req,res)=>{
    let rooms = await Room.findAll({})
    rooms.forEach((room,index)=>{
        if(room.ispass === 1){
            room.password = "yes";
        }
    })
    res.status(200).json({success:true,rooms:rooms})
})
//방 생성하기
router.post('/createroom',async (req,res)=>{
    console.log(req.body)
    let passwordInput = req.body.password;
    let ispass = 1;
    if(!req.body.password){
        passwordInput = null;
    }
    if(passwordInput===null)
        ispass = 0;

    let object = {
        title: req.body.title,
        password: passwordInput,
        ispass:ispass,
        max_people:req.body.maxpeople,
        language:req.body.language,
        user_id:req.body.user_id,
        rounds:req.body.rounds
    }
    try{
        await Room.create(object);
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:err})
    }
    return res.status(200).json({success:true})
   
})

router.get('/getroominfo',async(req,res)=>{            //방정보 가져오기
    const title = req.query.title;
    const sql= 'select * from rooms where title=?';
    db.query(sql,[title], (err,data)=>{
        res.send(data[0]);
    })
})

/*
//유저 한명이 하나의 방을 만든다는 가정하에 설계
router.get('/getround',async(req,res)=>{
    let user = null;
    if(req.isAuthenticated()){user={ID:req.user.user_id}};
    const params = user.ID;
    const sql= 'select * from rooms where user_id=?';
    db.query(sql,params, (err,data)=>{
        res.send(data);
    

    })
})*/

router.get('/getproblem',async(req,res)=>{                         //문제가져오는 쿼리
    const title = req.query.title;
    const sql= 'select * from problems';
    db.query(sql,[title], (err,data)=>{
        res.send(data);
    })
})
module.exports = router;