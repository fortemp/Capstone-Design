import React from 'react'

function ReadyImg(props){
    if(props.AmIHost){
      return (<img src="img/host.png"></img>)
    }else{
      return (props.ready===false ? <img></img> : <img src="img/ready.png"></img>)
    }
  }

export default ReadyImg