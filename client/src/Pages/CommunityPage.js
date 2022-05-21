/*
import React, { useEffect } from 'react'
import ChatSection from './LandingPage/Sections/ChatSection'
import BoardSection from './LandingPage/Sections/BoardSection'
import RoomSection from './LandingPage/Sections/RoomsSection'
import RankingSection from './LandingPage/Sections/RankingSection'
import Grid from '@material-ui/core/Grid';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
function CommunityPage() {
    const RankingStyle = { height: '740px' }
    const roomStyle = { height: '200px' }
    const chatStyle = { height: '532px'}
    const gameStyle = { height: '740px' }

  

    return (
        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <RankingSection style={RankingStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BoardSection style={gameStyle} />
                </Grid>

                <Grid item xs={12} md={3}>

                    <Grid
                        container
                        spacing={1}
                        direction="column" padding={"0 0 0 0"}>

                        <Grid item>
                            <RoomSection style={roomStyle} />
                        </Grid>

                        <Grid item>
                            <ChatSection style={chatStyle} />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>



        </SocketContext.Provider>
    )

}
*/

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

  const deletepost = (data1, data2) =>{
      let data = {
        post_id:data1,
        user_id:data2
      }
      dispatch(PostDelete(data))
      window.location.replace("/community")
  }
  let updata =null;
  const updatepost = (data1, data2, data3, data4) =>{
    updata={
      user_id:data1,
      post_id:data2,
      title:data3,
      description:data4
    }
    console.log(updata)
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
          <th className="th">삭제</th>
          <th className="th">수정</th>
        </tr>  
      </thead>
      </table>
      <div className="communityinfo">
      <table className="posttable">
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
        <td className="td"><button onClick={()=>deletepost(element.post_id, element.user_id)}>삭제</button></td>
        <td className="td"><Link to={'/Posting'} state={{user_id:element.user_id, post_id:element.post_id, title:element.title, description:element.description}}> 
        <button >수정</button></Link></td>
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
