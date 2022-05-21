import{Link} from "react-router-dom";
import { useEffect, useState} from 'react'
import Axios from 'axios';
import parse from 'html-react-parser'
import './CommunityPage.css'
import {GetPost} from "../actions/index";
import {useDispatch} from 'react-redux'
import {ViewUpdata, PostDelete} from '../actions/index';

function CommunityPage() { //임시로 null\
  
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({})

  let postArr  =null
  useEffect(async() => {
      try{
        const res = await Axios.get('/api/post/getpost', {
            params: {
                'idx': -1
            }
        })
        setInputData(res.data);
    } catch(e) {
        console.error(e.message)
    }
  },[])

  postArr  = Array.from(inputData);

  const changeText = (data1, data2) => {
    const [a, view] = data1.split('V', 2);
    const b = parseInt(view)+1
    let data = {
      title:data1.split('V',1)+'V'+String(b),
      post_id:data2
    }
    dispatch(ViewUpdata(data))
  };

  return(
    <div>
      <table className="posttable">
      <thead>
        <tr >
          <th className="thid">번호</th>
          <th className="thtitle">제목</th>
          <th className="th">시간</th>
          <th className="th">작성자</th>
          <th className="th">조회수</th>
        </tr>  
      </thead>
{postArr.map(element =>
      <tbody >
        <tr>
        <td className="tdid">{element.post_id}</td>
        <td className="tdtitle" >< Link to={`/PostPage/${element.post_id}`} 
        onClick={()=>changeText( element.title, element.post_id)} >
          {element.title.split('V',1) }</Link></td>
        <td className="tddate" >{element.posted_date.substr(0,10)}</td>
        <td className="td" >{element.name}</td>
        <td className="td" >{parseInt(element.title.split('V',2)[1])}</td>
        </tr>
      </tbody>
        )}
        <tfoot>
          <td ColSpan="5">
          <Link to='/'> 
          <button className="backbutton"> 뒤로가기 </button>
          </Link>
        <Link to={'/Posting'}> 
        <button className="postbutton"> 글작성 </button>
      </Link>
      </td>
        </tfoot>
      </table>
  

      
    </div>
  ); 
}


export default CommunityPage
