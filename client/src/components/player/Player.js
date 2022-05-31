import React from 'react'
import { useState ,useEffect} from 'react';
import ReadyImg from '../readyImg/ReadyImg'

function Player(props) {

  const [Myobject,setMyobject] = useState({});
  const [Playerobject, setPlayerObject] = useState({});
  useEffect(()=>{
    setMyobject(props.me)
    setPlayerObject(props.Playerobject);
  },[props.me,props.Playerobject])//
  
  
  return (
    <div className='player'>
    <div className='player_name'>
      <div className='readydiv'>
        <ReadyImg ready={props.ready} AmIHost={props.host}/>
      </div>
      <div className="player_infodiv">
        {
          props.me.socketId === props.Playerobject.socketId ? <span className='playername' style={{color:"cyan"}}>당신: {props.playername}</span>:
          <span className='playername'>{props.playername}</span>
        }
        <div className='exit'>
          {
            (props.me.socketId !== props.Playerobject.socketId && Myobject.host) === true ?
          <button className='exit_btn' onClick={()=>props.Eject(Myobject.host,Playerobject.socketId)}>
            <img className="exit_img" src="img/delete_47751.png"></img>
            <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
          </button> : <></>
          }
        </div>
      </div>
    </div>
    <div className="playerimg" ><img style={{width:"100%", height:"100%"}} src={props.playerImg}/></div>
  </div>
  )
}

export default Player