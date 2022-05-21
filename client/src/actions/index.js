
import {AUTH_LOGIN,AUTH_REGISTER,AUTH_USER,AUTH_LOGOUT,GET_USER,GET_RECENT_POST,GET_RANKING,BUY_IMG,Change_Img,
    POST_POSTING,POST_GETPOST,POST_VIEW,POST_DELETE,POST_UPDATA,CHANGE_ID,CHANGE_PWD,
    COMMENT_SETCOMMENT,COMMENT_GETCOMMENT,COMMENT_DELETE,COMMENT_UPDATA,GET_ROOMINFO,INSERT_PROBLEM,} from "./types";
import { ROOM_GET,ROOM_JOIN,ROOM_OUT } from "./types";
import * as authApi from '../api/auth'
import * as roomApi from '../api/room'
import * as postApi from '../api/post'
export async function registerUser(data){
    const req = await authApi.register(data)
    .then(res=>(res.data))
    return {
        type:AUTH_REGISTER,
        payload: req
    }
}
export async function loginUser(data){
    const req = await authApi.login(data)
    .then(res=>res.data)

    return {
        type:AUTH_LOGIN,
        payload: req
    }
}
export async function authUser(){
    const req = await authApi.auth()
    .then(res=>res.data)

    return {
        type:AUTH_USER,
        payload: req
    }
}

export async function logoutUser(){
    const req = await authApi.logout()
    .then(res=>res.data);

    return {
        type:AUTH_LOGOUT,
        payload:req
    } 
}
export async function GetUser(){
    const req = await authApi.getuser().then(res=>res.data);
    return {
        type:GET_USER,
        payload : req
    }
}
export async function GetRecentPost(){
    const req = await postApi.getrecentpost().then(res=>res.data);
    return {
        type:GET_RECENT_POST,
        payload : req
    }
}
export async function BuyImg(data){
    const req = await authApi.buyimg(data).then(res=>res.data);
    return {
        type:BUY_IMG,
        payload : req
    }
}
export async function ChangeID(data){
    const req = await authApi.Changeid(data).then(res=>res.data);
    return {
        type:CHANGE_ID,
        payload : req
    }
}
export async function ChangePWD(data){
    const req = await authApi.Changepwd(data).then(res=>res.data);
    return {
        type:CHANGE_PWD,
        payload : req
    }
}

export async function ChangeImg(data){
    const req = await authApi.changeimg(data).then(res=>res.data);
    return {
        type:Change_Img,
        payload : req
    }
}
export async function GetRanking(data){
    const req = await authApi.getranking(data).then(res=>res.data);
    return {
        type:GET_RANKING,
        payload : req
    }
}
export async function InsertProblem(data){
    const req = await authApi.insertproblem(data).then(res=>res.data);
    return {
        type:INSERT_PROBLEM,
        payload : req
    }
}
export async function getRoom(){
    const req = await roomApi.getRoom()
    .then(res=>res.data);

    return {
        type:ROOM_GET,
        payload:req
    }
}
//posting
export async function UserPosting(data){
    const req = await postApi.postings(data)
    .then(res=>(res.data))
    return {
        type:POST_POSTING,
        payload: req
    }
}
//글 가져오기
export async function GetPost(){
    const req = await postApi.getpost()
    .then(res=>res.data);
    return {
        type:POST_GETPOST,
        payload:req
    }
}
//조회수 업데이드
export async function ViewUpdata(data){
    const req = await postApi.viewUpdata(data)
    .then(res=>res.data);
    return {
        type:POST_VIEW,
        payload:req
    }
}

// 글 삭제
export async function PostDelete(data){
    const req = await postApi.postdelete(data)
    .then(res=>res.data);
    return {
        type:POST_DELETE,
        payload:req
    }
}
// 글 수정
export async function PostUpdata(data){
    const req = await postApi.postupdata   (data)
    .then(res=>res.data);
    return {
        type:POST_UPDATA,
        payload:req
    }
}

// 댓글입력
export async function SetComment(data){
    const req = await postApi.setcomment(data)
    .then(res=>res.data);
    return {
        type:COMMENT_SETCOMMENT,
        payload:req
    }
}
// 댓글 가져오기
export async function GetComment(){
    const req = await postApi.getcomment()
    .then(res=>res.data);
    return {
        type:COMMENT_GETCOMMENT,
        payload:req
    }
}
// 댓글 삭제
export async function CommentDelete(data){
    const req = await postApi.commentdelete(data)
    .then(res=>res.data);
    return {
        type:COMMENT_DELETE,
        payload:req
    }
}
//댓글 수정
export async function commentUpdata(data){
    const req = await postApi.commentupdata(data)
    .then(res=>res.data);
    return {
        type:COMMENT_UPDATA,
        payload:req
    }
}

export async function GetRoomInfo(){
    const req = await roomApi.getroominfo()
    .then(res=>res.data);
    return {
        type:GET_ROOMINFO,
        payload:req
    }
}