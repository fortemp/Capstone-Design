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
function LandingPage() {
    const RankingStyle = { height: '740px' }
    const roomStyle = { height: '200px' }
    const chatStyle = { height: '532px' }
    const gameStyle = { height: '740px' }

    const [mode, setmode] = useState("normal");

    const [ready, setready] = useState("false");  // 게임 준비 기능을 위한 useState // false = 준비 안됨 true = 준비됨

    const onReady = (e) => {
        setready("true");
      };
      useEffect(()=>{
        setready('false'); 
       },[]);
    return (
        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
            <Grid container spacing={1}>
                {mode=='normal'?
                <>
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
                </>:                  
                                                    //모드가 test로 변경되면 발생하는 컴포넌트들
                <>
                    <Grid item xs={12} md={9}>
                        <GameSection style={gameStyle} ready={ready} onChangeReady={function (_ready) { setready(_ready) }.bind(this)}/>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>

                        <Grid container spacing={1} direction="column" padding={"0 0 0 0"}>

                            <Grid item>
                                <GameSettingSection onChangeMode={function (_mode) { setmode(_mode) }.bind(this)} onChangeReady={function (_ready) { setready(_ready) }.bind(this)}
                                style={roomStyle} />
                            </Grid>

                            <Grid item>
                                <GameChatSection style={chatStyle} />
                            </Grid>

                        </Grid>

                    </Grid>
                </>
                }

            </Grid>



        </SocketContext.Provider>
    )
}

export default LandingPage