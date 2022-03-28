const express = require('express');
const router = express.Router();
const {Room} = require('../models/Room')
//유저정보 가져오는 api
router.get('/getrooms',(req,res)=>{
    Room.find().
    exec()
    .then(rooms=>{
        rooms.forEach((room,index)=>{
            if(room.password){
                room.password = "yes"//패스워드는 직접 안넘겨준다.
            }
        })
        return res.status(200).json({success:true,rooms})
    })
    .catch(err=>{
        return res.status(400).json({success:false,err})
    })
})

module.exports = router;