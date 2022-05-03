const express = require('express');
const router = express();
const Posting = require('../models/Posting')
const Comment = require('../models/Comment');
const passport = require('passport');
const Crypto = require('crypto');
const db = require('../config/db')

//게시물 입력
router.post('/postings',async (req,res)=>{
    console.log(req.body);
    const result = await Posting.findAll();
    let object =
    {
        title:req.body.title,
        description:req.body.description,
        language:req.body.language,
    };
    try{
        let user = null;
        if(req.isAuthenticated()){user={ID:req.user.user_id}};
        const user_id= user.ID; // 유저아이디를 로그인 아이디로 변경해야함 수정해야함
        object.post_id=result.length+1;
        object.user_id=user_id;
        object.posted_date=new Date(); // 시간 입력 정확히 해야함 수정해야함
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
router.get('/getpost',async (req, res)=>{
    const sql = 'select description, post_id, title, language, posted_date, p.created_at, p.deleted_at, p.updated_at, p.user_id, name from postings as p inner join users;';
    db.query(sql, (err, data) => {
     res.send(data);
    })
})

//조회수 변경
router.post('/viewUpdata',async (req, res)=>{
    Posting.update({ title : req.body.title }, {
        where : { post_id : req.body.post_id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

//댓글 가져오기
router.get('/getcomment',async (req, res)=>{
    const sql1= 'select * from comments where post_id=?;';
    const params = req.query.idx
    db.query(sql1, params, (err, data1) => {
        res.send(data1);
       })
})

//댓글입력
router.post('/setcomment',async (req, res)=>{
    console.log(req.body);
    const result1 = await Comment.findAll();// 전체 댓글수 알오오기
    console.log(result1.length);
    let object =
    {
        description:req.body.description, 
        post_id: req.body.post_id
    };
    try{
        let user1 = null;
        if(req.isAuthenticated()){user1={ID:req.user.user_id}};
        const user1_id= user1.ID; // 유저아이디를 로그인 아이디로 변경해야함 수정해야함
        object.comment_id=result1.length+1;
        object.user_id=user1_id;
        object.commented_date=new Date();
        console.log(object);
        await Comment.create(object);
        return res.status(200).json({success:true})
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({success:false})
    }
})



module.exports = router;