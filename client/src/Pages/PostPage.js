import React, { useEffect, useState } from 'react';
import './PostPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Link, useParams } from 'react-router-dom';
import {SetComment,PostDelete, CommentDelete,commentUpdata} from '../actions/index';
import {useDispatch} from 'react-redux'
import { getpost } from '../api/post';
import { getcomment } from '../api/post';
import { viewUpdata } from '../api/post';
import { Button } from '@material-ui/core';
//import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

const PostPage = ({ onInsert }) => {
  

    const [ post, setPost ] = useState({}); // 게시물 데이터
    const [ datacomment, setDatacomment ] = useState([]);//댓글데이터
    const [author,setAuthor] = useState("로딩중...");
    const [date,setDate] = useState('로딩중...');
    const [isRequesting, setIsRequesting] = useState(true);
    const dispatch = useDispatch();
    const [values, setContent] = useState({ // 댓글 입력용
      description: ''
    })
    const no = parseInt(useParams().post_id); // post id로 글 내용 찾기

    const DateStringHandler = (str)=>{//데이터 스트링 보기좋게 처리
      if(str==='로딩중...')
        return str;
      const Date = str.split('T')[0];
      const time = str.split('T')[1].split('.')[0]
      return Date+" "+time;
    }
    const [visilbe, setVisible] = useState(false);

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
    }).catch(e=>{
        console.error(e.message);
    });
   },[])

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

    useEffect(() => {
      viewUpdata(no);//조회수 늘리기
    },[])
    return (
      <>
        <div className='main1'>
      <Row className='sub'>
      <Col className='sub2'>
      <Card >
      <CardBody>
          {!isRequesting ?
              <>
              <CardHeader>
              <CardTitle tag="h3">{post.title}</CardTitle>
              </CardHeader>

                <div className="Info">
                <label className='label'>[작성자 - {author}] </label> 
                <label className='label'>[작성일 - {DateStringHandler(date)}]</label> 
                <label className='label'>[언어 - {post.language}]</label> 
                <label className='label'>[조회수:{post.view}]</label>
                <label className='fl'> <Button className='postButton' onClick={()=>deletepost(post.post_id, post.user_id)}>삭제</Button></label>
                <label className='fl'><Link to={'/ModifyPage'} state={{user_id:post.user_id, post_id:post.post_id, title:post.title, description:post.description}}> 
                <Button className='postButton' >수정</Button></Link></label>
                </div>

                <div className="Description"> 
                  <div className="Description" dangerouslySetInnerHTML={ {__html: post.description}}></div>
                </div>
              </>:
            <>
             로딩중...
            </>
          }
      </CardBody>
      </Card>
      </Col>
      <Col className='sub2'>
      <Card >
      <CardBody>
          
          <CKEditor  //CKEditor 댓글작성
          className='editor'
            editor={ClassicEditor}
            //data = {!visilbe?'<p></p>':updata.decription}
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
          <div className="bu">

          {!visilbe?
          <Button variant="outlined" className="button" onClick={() =>{ // 입력!
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
        }><i className="nc-icon nc-ruler-pencil" />댓글 입력</Button>
        : <button className="button" onClick={() =>{ // 수정!
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
      }{!visilbe?<></>:<button className="button" onClick={()=>{setVisible(false)}}>취소</button>}
    </div>

    <div>
        {datacomment.map((element) =>
                  <div >
                    <div className='commentInfo'>
                    <label className='label'>{element.name}</label>
                    <label className='label'>{DateStringHandler(element.created_at).substring(0,10)}</label>
                    <label className='fl'><Button className='button' onClick={()=>deletecomment(element.comment_id, element.user_id, element.post_id) }>삭제</Button>  </label>
                    <label className='fl'><Button className='button' onClick={()=>{setVisible(true);updatecomment(element.decription, element.comment_id, element.post_id, element.user_id);}}>수정</Button></label>
                    </div>
                    <div className='comment' dangerouslySetInnerHTML={ {__html: element.description}}></div>
                  </div>
          )
        }
      </div>

          <Link to='/community'> 
        <button className="back"><i className="nc-icon nc-user-run" /> 돌아가기 </button>
      </Link>
      </CardBody>
      </Card>
      </Col>
      </Row>
        </div>
      </>
    )
  }

export default PostPage;