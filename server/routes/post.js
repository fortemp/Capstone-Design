const express = require('express');
const router = express();
const Posting = require('../models/Posting')
const passport = require('passport');
const Crypto = require('crypto');
const db = require('../config/db')


let count = 0;

//게시물 입력
router.post('/postings',async (req,res)=>{
    console.log(req.body);
    let object =
    {
        title:req.body.title,
        description:req.body.description,
    };
    try{
        let user = null;
        if(req.isAuthenticated()){user={ID:req.user.user_id}};
        const user_id= user.ID; // 유저아이디를 로그인 아이디로 변경해야함 수정해야함
        const post_id= count++; // 자동증가 찾아야함 수정해야함
        object.post_id=post_id;
        object.user_id=user_id;
        posted_date=new Date(); // 시간 입력 정확히 해야함 수정해야함
        console.log(object);
        await Posting.create(object);
        return res.status(200).json({success:true})
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({success:false})
    }
})

//게시물 가져오기
router.get('/getpost', (req, res)=>{
    const sql = 'select* from postings;';
    db.query(sql, (err, data) => {
        if(!err){ res.send(data);
            return data;
        }
        else {
            res.send(err);
            return res.status(400).json({success:false});
        }
    })
})


module.exports = router;