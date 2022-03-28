import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
function Logo() {
  return (
    <div id="logo" >
        <Button  color="inherit" variant="h6" component="div">
            <a href="/">
                <img src={require('../../../assets/logo64.png')} 
                alt={"온라인 포커"}/>
                <span id="logotype">(POCKER)</span>
            </a>
        </Button>
    </div>
  )
}

export default Logo