import{Link} from "react-router-dom";
import { useEffect, useState} from 'react'
import Axios from 'axios';
import parse from 'html-react-parser'
import './CommunityPage.css'

function CommunityPage() { //임시로 null\

  const [viewContent , setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      setViewContent(response.data);
    })
  },[viewContent])

  return(
    <div>
      
      <table className="table">
      <thead>
        <tr >
          <th className="thid">번호</th>
          <th className="th">제목</th>
          <th className="th">시간</th>
          <th className="th">작성자</th>
        </tr>
      </thead>
      <tbody>
      {viewContent.map(element =>(
        <tr>
        <td className="thid">{element.id}</td>
        <td className="td">{element.title}</td>
        <td className="td">{element.POST_DATE}</td>
        </tr>
          ))}
      </tbody>
      </table>

      <Link to='/Posting'> 
        <button> 글작성 </button>
      </Link>
    </div>
  ); 
}

export default CommunityPage