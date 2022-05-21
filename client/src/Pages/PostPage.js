import React, { useEffect, useState } from 'react';
import './PostPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Link, useParams } from 'react-router-dom';
import {SetComment} from '../actions/index';
import {useDispatch} from 'react-redux'
import { getpost } from '../api/post';
import { getcomment } from '../api/post';
import { viewUpdata } from '../api/post';
//import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

const PostPage = ({ onInsert }) => {

    const [ post, setPost ] = useState({}); // 게시물 데이터
    const [ datacomment, setDatacomment ] = useState([]);//댓글데이터
    const [author,setAuthor] = useState("로딩중...");
    const [date,setDate] = useState('로딩중...');
    const [isRequesting, setIsRequesting] = useState(true);
    const [values, setContent] = useState({ // 댓글 입력용
      description: ''
    })
    const dispatch = useDispatch();
    const no = parseInt(useParams().post_id); // post id로 글 내용 찾기

    const DateStringHandler = (str)=>{//데이터 스트링 보기좋게 처리
      const Date = str.split('T')[0];
      console.log(str)
      const time = str.split('T')[1].split('.')[0]
      return Date+" "+time;
    }
    useEffect(() => {// 글내용가져오고 조회수 늘리는 요청 보냄
       getpost(no).
       then(res=>{
         setPost(res.data);
         setAuthor(res.data.User.name);//작성자
         setDate(res.data.createdAt);//날짜설정
         setIsRequesting(false);
       }).catch(err=>{
         console.log(err);
       })
     },[isRequesting])
     
     useEffect(() => { // 댓글가져오기
      getcomment(no).
      then(res=>{
        setDatacomment(res.data);
      })
    },[])

    useEffect(() => {
      viewUpdata(no);//조회수 늘리기
    },[])
    return (
      <>

        <div className="post-view-wrapper"> 
        {!isRequesting ? 
            <>
              <div className="post-view-title">
                <h2>({ post.post_id }) 제목 -  {post.title}</h2> 
              </div>
              <div className="post-view-row">
              <label>[작성자 - {author}] </label> <label>[작성일 - {DateStringHandler(date)}]</label> <label>[언어 - {post.language}]</label> <label>[조회수:{post.view}]</label>
              </div>
              <div className="post-decription"> 
                <div dangerouslySetInnerHTML={ {__html: post.description}}>
                </div>
              </div>
            </>:
            <>
             로딩중...
            </>
          }
          <CKEditor  //CKEditor 댓글작성
          className='editor'
            editor={ClassicEditor}
            onReady={editor => {
            }}
            config={{
              
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
                                window.location.reload();
                              }else{
                                alert('오류가 발생했습니다.')
                              }
                            })
                        }, 500)
        }
        }>입력</button>
</div>
        <div className='commentdiv'>
        {datacomment.map((element) =>
                  <div className='comment'>
                    <label>{element.name}   </label><label dangerouslySetInnerHTML={ {__html: element.description}}></label> <button>삭제</button>  <button>수정</button>
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