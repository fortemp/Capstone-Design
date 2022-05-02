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

function CommunityPage() { //임시로 null\
  
  const [inputData, setInputData] = useState([])

  useEffect(async() => {
    await Axios.get('/api/post/getpost').then((response)=>{
      setInputData(response.data);
    })
  },[])

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
{inputData.map(element =>
      <tbody >
        <tr>
        <td className="tdid">{element.post_id}</td>
        <td className="tdtitle" >< Link to={`/PostPage/${element.post_id}`} >{element.title }</Link></td>
        <td className="td" ></td>
        <td className="td" ></td>
        <td className="td" ></td>
        </tr>
      </tbody>
        )}
        <tfoot>
          <td ColSpan="5">
          <Link to='/'> 
          <button className="backbutton"> 뒤로가기 </button>
          </Link>
        <Link to='/Posting'> 
        <button className="postbutton"> 글작성 </button>
      </Link>
      </td>
        </tfoot>
      </table>
  

      
    </div>
  ); 
}


export default CommunityPage
