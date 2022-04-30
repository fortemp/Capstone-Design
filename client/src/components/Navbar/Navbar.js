import React,{useEffect,useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import './Navbar.css'
import RightSide from './Sections/RightSide';


function Navbar(props) {

    
    const fontStyle = { 
        fontSize:'15px',
        marginRight:"50px",
    }

    const [toggle,setToggle] =  useState(true)
    
    if(toggle){
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar style={{backgroundColor:'#A47C6D'}} position="relative">
                        <RightSide/>
                </AppBar>
            </Box>
        )
    }
}

export default Navbar
//toggle 태그 뺌, logo 태그를 Rightside와 병합했음