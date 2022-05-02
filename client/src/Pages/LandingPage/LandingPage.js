                                                                            //메인 화면
import React, { useEffect, useState } from 'react'
import ChatSection from './Sections/ChatSection'
import GameSection from './Sections/GameSection'
import RoomSection from './Sections/RoomsSection'
import RankingSection from './Sections/RankingSection'
import GameChatSection from './Sections/GameChatSection'
import MainSection from './Sections/MainSection'
import GameSettingSection from './Sections/GameSettingSection'
import Grid from '@material-ui/core/Grid';
import { SocketContext, Roomsocket, Publicsocket } from '../../api/socket'
import  Axios  from 'axios';
import {GetName} from '../../actions/index'

import {host} from'../HostRoomPage'
function LandingPage() {
    const RankingStyle = { height: '740px' }
    const roomStyle = { height: '250px' }
    const chatStyle = { height: '482px' }
    const gameStyle = { height: '740px' }

    const [mode, setmode] = useState("normal");

    const [ready, setready] = useState("false");  // 게임 준비 기능을 위한 useState // false = 준비 안됨 true = 준비됨

    const [start, setstart] = useState("false");

    const onReady = (e) => {
        setready("true");
      };
      const onstart = (e) => {
        setstart("true");
      };

      useEffect(()=>{
        setready('false'); 
        setstart('false');
       },[]);

    return (
        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
            <Grid container spacing={1}>
               
                    <Grid item xs={12} md={3}>
                        <RankingSection style={RankingStyle} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <MainSection style={gameStyle} />
                    </Grid>
                        <Grid item xs={12} md={3}>

                            <Grid container spacing={1} direction="column" padding={"0 0 0 0"}>

                                <Grid item>
                                    <RoomSection onChangeMode={function (_mode) { setmode(_mode) }.bind(this)} style={roomStyle} />
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

export default LandingPage