import React from 'react'
import githubImg from '../../assets/github.png'

function Footer() {
  return (
    <div style={{paddingTop:'auto', textAlign:'center'}}>
        <a href="https://github.com/abcd0978/reactBoard">
          <img src={githubImg} art="github pic"/>  
        </a>
        <p style={{fontSize:"12px"}}>Author:Kim mingyu, Shim yubin<br/>Copyleft: free to copy</p>
    </div>
  )
}

export default Footer