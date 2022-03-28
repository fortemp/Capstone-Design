import React,{useEffect} from 'react'
import Box from '@material-ui/core/Box'
import './SubmitSection.css'

function SubmitSection(props) {
  
  return (
    <Box style={props.style} bgcolor={"#fff"}>
         <div className='Submit'>
             <input className='Msg' type='text'name="txtChat"/> 
             <input className='SubmitBtn'type='button' name="txtChat" value="↑"/> 
         </div>
    </Box>
  )
}

export default SubmitSection