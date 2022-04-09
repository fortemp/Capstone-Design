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
import { GetPost } from "../actions/index";
import {useDispatch} from 'react-redux'

function CommunityPage() { //임시로 null\


const [users, setUsers] = useState([]);

useEffect(()=>{
  async function fetch() {
      const response = await Axios.get(GetPost());
  // 일단 response의 형태를 확인하고
  console.log(response.data);
  // fetch 함수 아래에 setUsers를 해주어야 한다.
  setUsers(response.data);
  };
  fetch();
}, [])

const userName = users.map(
  (user) => (<li key={user.id}> {user.name} </li>)
);

  return(
    <div>
      
      <table className="table">
      <thead>
        <tr >
          <th className="thid">번호</th>
          <th className="thtitle">제목</th>
          <th className="th">시간</th>
          <th className="th">작성자</th>
          <th className="th">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td className="tdid" >{userName.post_id}</td>
        <td className="td" ></td>
        <td className="td" ></td>
        <td className="td" ></td>
        <td className="td" ></td>
        </tr>
      </tbody>
      </table>

      <Link to='/Posting'> 
        <button className="button"> 글작성 </button>
      </Link>
    </div>
  ); 
}


export default CommunityPage
