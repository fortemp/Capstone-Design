import React, { useEffect, useState } from 'react';
import './PostPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {SetComment,PostDelete, CommentDelete,commentUpdata} from '../actions/index';
import {useDispatch} from 'react-redux'

const PostPage = ({ onInsert }) => {
    const [ data, setData ] = useState({}); // 게시물 데이터
    const [values, setContent] = useState({ // 댓글 입력용
      description: ''
    })
    const [ datacomment, setDatacomment ] = useState({});//댓글데이터
    const [visilbe, setVisible] = useState(false);
    const dispatch = useDispatch();
    const no = useParams().post_id; // post id로 글 내용 찾기
    const n1 = parseInt(no)

    useEffect(async() => {// 글내용가져오기
       try{
        const res = await Axios.get('/api/post/getpost', {
            params: {
                'idx': n1
            }
        })
        setData(res.data);
    } catch(e) {
        console.error(e.message)
    }
     },[])
     

     useEffect(async() => { // 댓글가져오기
      try{
        const res = await Axios.get('/api/post/getcomment', {
            params: {
                'idx': no
            }
        })
        setDatacomment(res.data);
    } catch(e) {
        console.error(e.message)
    }
   },[])

   let commentArr = Array.from(datacomment); // 코멘트 배열
   let Arr = Array.from(data); // 글 내용 배열
   console.log(commentArr)
   
   const deletepost = (data1, data2) =>{  // 글 삭제
    let data = {
      post_id:data1,
      user_id:data2
    }
    dispatch(PostDelete(data))
    window.location.replace("/community")
}

const deletecomment = (data1, data2, data3) =>{  // 댓글 삭제
  let data = {
    comment_id:data1,
    user_id:data2,
    post_id:data3
  }
  console.log(data)
  dispatch(CommentDelete(data))
  window.location.reload();
}
const [update,setupdate]= useState({
  comment_id:'',
  post_id:'',
  user_id:'',
  description:''
}) // 댓글 업데이트용

const updatecomment = (data1, data2, data3, data4)=>{ // 댓글 업데이트
  setContent({
    ...values,
    description: data1
  })
  setupdate({
    comment_id:data2,
    post_id:data3,
    user_id:data4,
    description:data1
  })
  console.log(update)
}

    return (
      <>

        <div className="post-view-wrapper"> 
          {
            Arr.map (element =>
              <>
              
                <div className="post-view-title">
                  <label>({ element.post_id }) 제목 -   </label><label>{element.title.split('V',1) }</label> 
                </div>
                <div className="post-view-row">
                <label>[작성자 - {element.name}] </label> <label>[작성일 - {element.posted_date.substr(0,10)}]</label> <label>[언어 - {element.language}]</label>
                <button onClick={()=>deletepost(element.post_id, element.user_id)}>삭제</button>
                <Link to={'/ModifyPage'} state={{user_id:element.user_id, post_id:element.post_id, title:element.title, description:element.description}}> 
                <button >수정</button></Link>
                </div>
                <div className="post-decription"> 
                  <div dangerouslySetInnerHTML={ {__html: element.description}}>
                  </div>
                </div>
              </>
            ) 
          }
          
          <CKEditor  //CKEditor 댓글작성
          className='editor'
            editor={ClassicEditor}
            //data = {!visilbe?'<p></p>':updata.decription}
            onReady={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setContent({
                ...values,
                description: data
              })
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
          <div>
            {!visilbe?
          <button className="submit-button" onClick={() =>{ // 입력!
                          setTimeout(() => {
                            let data = {
                              post_id:no,
                              description: values.description,
                            }
                            dispatch(SetComment(data))
                            .then(res=>{
                              if(res.payload.success){
                                alert('작성완료')
                                window.location.reload();
                              }else{
                                alert('오류가 발생했습니다.')
                              }
                            })
                        }, 500)
        }
        }>입력</button>
        : <button className="submit-button" onClick={() =>{ // 수정!
          setTimeout(() => {
            let data = {
              post_id:update.post_id,
              user_id:update.user_id,
              comment_id:update.comment_id,
              description:values.description
            }
            console.log(data)
            dispatch(commentUpdata(data))
            .then(res=>{
              if(res.payload.success){
                alert('수정완료')
                window.location.reload();
              }else{
                alert('오류가 발생했습니다.')
                window.location.reload();
              }
            })
        }, 500)
        ;setVisible(false);
      }
      }>수정</button> 
      }{!visilbe?<></>:<button className="submit-button" onClick={()=>{setVisible(false)}}>취소</button>}
</div>
        <div className='commentdiv'>
        {commentArr.map((element) =>
                  <div className='comment'>
                    <label>{element.name}   </label><label dangerouslySetInnerHTML={ {__html: element.description}}></label> 
                    <button onClick={()=>deletecomment(element.comment_id, element.user_id, element.post_id) }>삭제</button>  
                    <button onClick={()=>{setVisible(true);updatecomment(element.decription, element.comment_id, element.post_id, element.user_id);}}>수정</button>
                  </div>
          )
        }
</div>
          <Link to='/community'> 
        <button className="post-view-go-list-btn"> 돌아가기 </button>
      </Link>
      
        </div>
      </>
    )
  }

export default PostPage;