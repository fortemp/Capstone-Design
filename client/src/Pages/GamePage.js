                                                                            //메인 화면
import React, { useEffect, useState } from 'react'
import GameSection from './LandingPage/Sections/GameSection'
import GameChatSection from './LandingPage/Sections/GameChatSection'
import GameSettingSection from './LandingPage/Sections/GameSettingSection'
import Grid from '@material-ui/core/Grid';
import { Link, useParams } from 'react-router-dom';
import { SocketContext, Roomsocket, Publicsocket } from '../api/socket'
import {useDispatch} from 'react-redux'


function GamePage() {

    const dispatch = useDispatch();
    const room = useParams().room_id; // post id로 글 내용 찾기


    const roomStyle = { height: '250px' } 
    const chatStyle = { height: '482px' }
    const gameStyle = { height: '740px' }

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
        
                    <Grid item xs={12} md={9}>
                        <GameSection style={gameStyle} room={room} ready={ready} onChangeReady={function (_ready) { setready(_ready) }.bind(this)}
                         start={start} onChangeStart={function (_start) { setstart(_start) }.bind(this)}/>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>

                        <Grid container spacing={1} direction="column" padding={"0 0 0 0"}>

                            <Grid item>
                                <GameSettingSection  ready={ready} onChangeReady={function (_ready) { setready(_ready) }.bind(this)}
                                 start={start} onChangeStart={function (_start) { setstart(_start) }.bind(this)}
                                style={roomStyle} />
                            </Grid>

                            <Grid item>
                                <GameChatSection style={chatStyle} />
                            </Grid>

                        </Grid>

                    </Grid>
            </Grid>



        </SocketContext.Provider>
    )
}

export default GamePage