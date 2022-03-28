import React, { useEffect } from 'react'
import ChatSection from './Sections/ChatSection'
import GameSection from './Sections/GameSection'
import RoomSection from './Sections/RoomsSection'
import RankingSection from './Sections/RankingSection'
import SubmitSection from './Sections/SubmitSection'
import Grid from '@material-ui/core/Grid';
import { SocketContext, Roomsocket, Publicsocket } from '../../api/socket'
function LandingPage() {
    const RankingStyle = { height: '740px' }
    const roomStyle = { height: '200px' }
    const chatStyle = { height: '460px'}
    const gameStyle = { height: '740px' }
    const submitStyle = { height: '65px' }

  

    return (
        <SocketContext.Provider value={{ room: Roomsocket, public: Publicsocket }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <RankingSection style={RankingStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <GameSection style={gameStyle} />
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

                        <Grid item>
                            <SubmitSection style={submitStyle} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>



        </SocketContext.Provider>
    )
}

export default LandingPage