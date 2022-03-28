import React,{useEffect} from 'react'
import ChatSection from './Sections/ChatSection'
import GameSection from './Sections/GameSection'
import RoomSection from './Sections/RoomsSection'
import Grid from '@material-ui/core/Grid';
import {SocketContext,Roomsocket,Publicsocket} from '../../api/socket'
function LandingPage() {
    const roomStyle={height:'200px'}
    const chatStyle={height:'500px'}
    const gameStyle={height:'740px'}
    
    return (
    <SocketContext.Provider value={{room:Roomsocket,public:Publicsocket}}>
        <Grid container spacing={1}>

            <Grid item xs={12} md={9}>
                <GameSection style={gameStyle}/>
            </Grid>

            <Grid item xs={12} md={3}>

                <Grid
                container
                spacing={1}
                direction="column">

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

export default LandingPage