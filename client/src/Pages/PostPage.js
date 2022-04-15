import React, { useEffect, useState } from 'react';
import './PostPage.css';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PostPage = ({ history, location, match }) => {
    const [ data, setData ] = useState({});

    const no = useParams().post_id;
  
    useEffect(async() => {
        Axios.get('/api/post/getpost').then((response)=>{
         setData(response.data[no]);
       })
     },[])

    return (
      <>
        <h2 align="center">게시글 상세정보</h2>
  
        <div className="post-view-wrapper">
          {
            data ? (
              <>
                <div className="post-view-row">
                  <label>게시글 번호</label>
                  <label>{ data.post_id }</label>
                </div>
                <div className="post-view-row">
                  <label>제목</label>
                  <label>{ data.title }</label>
                </div>
                <div className="post-view-row">
                  <label>작성일</label>
                  <label>{ data.createDate }</label>
                </div>
                <div className="post-view-row">
                  <label>조회수</label>
                  <label></label>
                </div>
                <div className="post-view-row">
                  <label>내용</label>
                  <div>
                    {
                      data.description
                    }
                  </div>
                </div>
              </>
            ) : '해당 게시글을 찾을 수 없습니다.'
          }
          <Link to='/community'> 
        <button className="post-view-go-list-btn"> 돌아가기 </button>
      </Link>
        </div>
      </>
    )
  }

export default PostPage;