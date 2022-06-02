import{Link} from "react-router-dom";
import { useEffect, useState, Component} from 'react'
import './CommunityPage.css'
import {GetPost} from "../actions/index";
import { getposts } from "../api/post";
import Pagination from "react-js-pagination";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

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
      <Row className="app">
      <Col >
      <Card >
      <CardBody>
      <table responsive className="posttable">
      <thead className="text-primary">
        <tr >
          <th className="thiD">번호</th>
          <th className="Title">제목</th>
          <th className="Name">작성자</th>
          <th className="View">조회수</th>
          <th className="Date">날짜</th>
        </tr>  
      </thead>
      </table>
      <div>
      <table className="posttable">
{state.data&&state.data.map(post =>
      <tbody >
        <tr>
        <td className="tdiD">{post.post_id}</td>
        <td className="Title">< Link to={`/PostPage/${post.post_id}`} >
          {post.title}</Link></td>
        <td className="Name">{post.User.name}</td>
        <td className="View">{post.view}</td>
        <td className="Date">{DateStringHandler(post.createdAt).slice(0,10)}</td>
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
        <button className="postbutton" ><i className="nc-icon nc-paper" /> 글작성 </button>
      </Link>

      <Link to='/'> 
          <button className="backbutton"><i className="nc-icon nc-user-run" /> 뒤로가기 </button>
      </Link>
      </CardBody>
      </Card>
      </Col>
      </Row>
    </div>
  );
}


export default CommunityPage
