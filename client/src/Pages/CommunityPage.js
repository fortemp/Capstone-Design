<<<<<<< HEAD
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
=======
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
>>>>>>> 5ee9032a2c91ff5e3cf8b8db8651bd65fce69ccb
}

export default CommunityPage






