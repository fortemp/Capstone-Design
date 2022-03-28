import React,{useEffect} from 'react'
import Box from '@material-ui/core/Box'
import { TextField } from '@mui/material'
import "./ChatSection.css"


function ChatSection(props) {

  return (
    <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
         <div id="Chatting">채팅창</div>
    </Box>
  )
}

export default ChatSection