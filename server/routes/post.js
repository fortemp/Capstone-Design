const express = require('express');
const router = express();
const Posting = require('../models/Posting')
const Comment = require('../models/Comment');
const User = require('../models/User')
const passport = require('passport');
const db = require('../config/db')
const {MakeInputOutput} = require('../util/GradingApi')
const {executeCode} = require('../util/GradingApi')
//게시물 입력
router.post('/postings',async (req,res)=>{
    console.log(req.body);
    let object =
    {
        title:req.body.title,
        description:req.body.description,
        language:req.body.language,
    };
    try{
        let user = null;
        if(req.isAuthenticated()){
            user={ID:req.user.user_id}
        }else{
            return res.status(400).json({success:false})
        }
        const user_id= user.ID; // 유저아이디를 로그인 아이디로 변경해야함 수정해야함
        object.user_id=user_id;
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
router.get('/getposts',(req, res)=>{
    Posting.findAll({
        include: 
        [
           {
             model: User,//User테이블과 조인(user_id로 조인하는것은 미리 설정해두었음)
             attributes: ['name']
           }
        ],
   }).then(response=>{
       return res.status(200).json(response)
   }).catch(err=>{
       console.log(err)
       return res.send(500)
   })
})

//특정게시물 가져오기
router.get('/getpost',(req, res)=>{
    Posting.findOne({
        include: 
        [
           {
             model: User,//User테이블과 조인(user_id로 조인하는것은 미리 설정해두었음)
             attributes: ['name']
           }
        ],
        where:{post_id:req.query.idx}
   },)
   .then(response=>{
       return res.status(200).json(response)
   }).catch(err=>{
       console.log(err)
       return res.send(500)
   })
})

//조회수 변경
router.get('/viewUpdata',async (req, res)=>{
    Posting.increment({view:1},{where:{post_id:req.query.idx}})
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

//댓글 가져오기
router.get('/getcomment',async (req, res)=>{
    const sql1= 'select description, c.post_id, commented_date, comment_id, c.created_at, c.updated_at, c.deleted_at, c.user_id, name from comments as c inner join users where post_id =? and c.user_id=users.user_id;';
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
//게시글 삭제
router.post('/postdelete',async (req, res)=>{
    let user=null;
    user={ID:req.user.user_id}
    const sql1='delete from postings where post_id=?;';
    const sql2='delete from comments where post_id=?;';
    const params = req.body.post_id;
    if(req.body.user_id==user.ID){
        db.query(sql1, params)
        db.query(sql2, params)
    }else{
        alert("작성자가 아닙니다.");
    }
})
// 게시글 업데이트
router.post('/postupdata',async (req, res)=>{
    Posting.update({ title : req.body.title, description: req.body.description, language: req.body.language }, {
        where : { post_id : req.body.post_id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

//댓글 삭제
router.post('/commentdelete',async (req, res)=>{
    let user=null;
    user={ID:req.user.user_id}
    const sql='delete from comments where post_id=? AND comment_id=?;';
    const params1 = req.body.post_id;
    const params2 = req.body.comment_id;
    if(req.body.user_id==user.ID){
        db.query(sql, [params1, params2])
    }else{
        res.alert("권한없음");
    }
})

//댓글 업데이트
router.post('/commentupdata',async (req, res)=>{
    let user=null;
    user={ID:req.user.user_id}
    const sql='update comments set description=? where post_id=? AND comment_id=?And user_id=?;';
    const params1 = req.body.description;
    const params2 = req.body.post_id;
    const params3 = req.body.comment_id;
    const params4 = req.body.user_id;
    db.query(sql, [params1, params2, params3, params4])
})

//최신글 가져오기
router.get('/getrecentpost',async(req,res)=>{
    const sql= 'select * from postings order by post_id desc limit 5';
    db.query(sql, (err,data)=>{
        res.send(data);
    })
})

//들어갈문제 임시로 컴파일하기
router.post('/compilecode',async(req,res)=>{
    let language = req.body.language;
    let CodeString = req.body.code;
    let inputArr = Object.values(req.body.inputs)
    let outputArr = Object.values(req.body.outputs);
    MakeInputOutput(9999,inputArr,outputArr);
    let result = await executeCode('testuser',language,'../problem',CodeString,9999,4)
    
    res.status(200).json(result);
})


module.exports = router;