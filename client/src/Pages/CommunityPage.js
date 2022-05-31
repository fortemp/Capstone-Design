import{Link} from "react-router-dom";
import { useEffect, useState, Component} from 'react'
import './CommunityPage.css'
import {GetPost} from "../actions/index";
import { getposts } from "../api/post";
import Pagination from "react-js-pagination";
import axios from "axios";

function CommunityPage() { //임시로 null\
  const [Posts, setPosts] = useState([])
//pagination 용
  const [state, setstate] = useState({ 
    data: [] ,
  })
  const [page, setpage] = useState(1)

  useEffect(() => {
    getposts()
    .then(res=>{
      console.log(res.data)
      setPosts(res.data);
      setstate({data:res.data.slice((1*count)-count,(1*count))});
      setpage(1);
    })
  },[])
let count = 10;
//pagination 핸들러
const  handlePageChange = pageNumber => {
  console.log(`active page is ${pageNumber}`);
  setstate({data:Posts.slice((pageNumber*count)-count,(pageNumber*count))})
  setpage(pageNumber)
}
  
  const DateStringHandler = (str)=>{
    const Date = str.split('T')[0];
    const time = str.split('T')[1].split('.')[0]
    return Date+" "+time;
  }
console.log(state)
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
          <th className="th">수정일</th>
        </tr>  
      </thead>
      </table>
      <div className="communityinfo">
      <table className="posttable">
{state.data&&state.data.map(post =>
      <tbody >
        <tr>
        <td className="tdid">{post.post_id}</td>
        <td className="tdtitle" >< Link to={`/PostPage/${post.post_id}`} >
          {post.title}</Link></td>
        <td className="tddate" style={{"fontSize":'14px'}} >{DateStringHandler(post.createdAt).substring(0,10)}</td>
        <td className="td" >{post.User.name}</td>
        <td className="td" >{post.view}</td>
        </tr>
      </tbody>
)}
      </table>
      </div>
      <footer>
      <Pagination
          totalItemsCount={Posts.length}
          onChange={handlePageChange}
          activePage={page}
          itemsCountPerPage={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
        />
      </footer>
      
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
