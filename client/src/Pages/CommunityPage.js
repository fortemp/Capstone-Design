import{Link} from "react-router-dom";
import { useEffect, useState} from 'react'
import Axios from 'axios';
import parse from 'html-react-parser'
import './CommunityPage.css'
import {GetPost} from "../actions/index";
import {useDispatch} from 'react-redux'
import {ViewUpdata, PostDelete} from '../actions/index';
import { getposts } from "../api/post";

function CommunityPage() { //임시로 null\
  const [Posts, setPosts] = useState([])

  useEffect(() => {
    getposts()
    .then(res=>{
      console.log(res.data)
      setPosts(res.data);
    })
  },[])

  const DateStringHandler = (str)=>{
    const Date = str.split('T')[0];
    const time = str.split('T')[1].split('.')[0]
    return Date+" "+time;
  }

  return(
    <div className="communityapp">
      <table className="posttable">
      <thead>
        <tr >
          <th className="thid">번호</th>
          <th className="thtitle">제목</th>
          <th className="date">시간</th>
          <th className="th">작성자</th>
          <th className="th">조회수</th>
        </tr>  
      </thead>
      </table>
      <div className="communityinfo">
      <table className="posttable">
{Posts.map(post =>
      <tbody >
        <tr>
        <td className="tdid">{post.post_id}</td>
        <td className="tdtitle" >< Link to={`/PostPage/${post.post_id}`} >
          {post.title}</Link></td>
        <td className="tddate" style={{"fontSize":'12px'}} >{DateStringHandler(post.createdAt).substring(0,10)}</td>
        <td className="td" >{post.User.name}</td>
        <td className="td" >{post.view}</td>
        <td clsssName="tddate" style={{"fontSize":'12px'}}>{DateStringHandler(post.updatedAt).substring(0,10)}</td>
        </tr>
      </tbody>
)}
      </table>
      </div>
      <br/>
      <br/>

      <Link to={'/Posting'}> 
        <button className="postbutton"> 글작성 </button>
      </Link>

      <Link to='/'> 
          <button className="backbutton"> 뒤로가기 </button>
      </Link>
    </div>
  );
}


export default CommunityPage
