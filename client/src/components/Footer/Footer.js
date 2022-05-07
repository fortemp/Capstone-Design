import React from 'react'
import githubImg from '../../assets/github.png'

function Footer() {
  return (
    <div style={{paddingTop:'auto', textAlign:'center'}}>
        <a href="https://github.com/fortemp/Capstone-Design">
          <img src={githubImg} art="github pic"/>  
        </a>
        <p style={{fontSize:"12px"}}>Author:Kim mingyu, Cha Yohan, Kim Taejun, Oh huiChan<br/>Copyleft: free to copy</p>
    </div>
  )
}

export default Footer