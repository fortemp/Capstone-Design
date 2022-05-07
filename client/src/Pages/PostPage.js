import React, { useEffect, useState } from 'react';
import './PostPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {SetComment} from '../actions/index';
import {useDispatch} from 'react-redux'

const PostPage = ({ onInsert }) => {
    const [ data, setData ] = useState({}); // 게시물 데이터
    const [values, setContent] = useState({ // 댓글 입력용
      description: ''
    })
    const [ datacomment, setDatacomment ] = useState({});//댓글데이터

    const dispatch = useDispatch();
    const no = useParams().post_id; // post id로 글 내용 찾기
  
    useEffect(async() => {// 글내용가져오기
        Axios.get('/api/post/getpost').then((response)=>{
         setData(response.data[no-1]);
       })
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

   let commentArr = Array.from(datacomment);
   let date = ""+data.posted_date; // 강제로 string 만들기
   let title = ""+data.title;

    return (
      <>

        <div className="post-view-wrapper"> 
          {
            data ? (
              <>
              
                <div className="post-view-title">
                  <label>({ data.post_id }) 제목 -   </label><label>{title.split('V',1) }</label> 
                </div>
                <div className="post-view-row">
                <label>[작성자 - {data.name}] </label> <label>[작성일 - {date.substr(0,10)}]</label> <label>[언어 - {data.language}]</label>
                </div>
                <div className="post-decription"> 
                  <div dangerouslySetInnerHTML={ {__html: data.description}}>
                  </div>
                </div>
              </>
            ) : '해당 게시글을 찾을 수 없습니다.'
          }
          <CKEditor  //CKEditor 댓글작성
          className='editor'
            editor={ClassicEditor}
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
                                window.location.reload();/*
                                Axios.get('/api/post/getcomment',{              
                                  params: { 
                                    'idx': no,
                                  }
                                }).then((response)=>{
                                  setDatacomment(response.data);                                  
                               })*/
                              }else{
                                alert('오류가 발생했습니다.')
                              }
                            })
                        }, 500)
        }
        }>입력</button>
</div>
        <div className='commentdiv'>
        {commentArr.map((element) =>
                  <label className='comment' dangerouslySetInnerHTML={ {__html: element.description}}>{}</label>
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