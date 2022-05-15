//게임방 설정 섹션
import React, { useEffect, useState, useContext, useRef } from 'react'
import Box from '@material-ui/core/Box'
import "./GameSettingSection.css"
import { Link } from "react-router-dom";
import Axios from 'axios';

function GameSettingSection(props) {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [round, setround] = useState([]);

  //방정보 가져오기
  useEffect(async() => {
    let isMounted = true; 
    await Axios.get('/api/room/getround').then(data => {
      if (isMounted) setround(data.data);    // add conditional check
    })
      return () => { isMounted = false };
},[])

const timer = ()=> setInterval(()=>{
  clearInterval(timer);
  if(seconds<59)
  setSeconds(seconds+1);
  else{
    setSeconds(0);
    setMinutes(minutes+1);
  }
},1000);

  return (
    <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
      <div style={props.style}>
      <div>
      <button onClick={function (e) { e.preventDefault(); props.onChangeMode('normal'); }.bind(this)}>방에 나갔을 때 버튼 </button>
      {props.start == "false" ?
        <>
          {props.ready == "false" ?
            <button className="raady_btn" onClick={function (e) { e.preventDefault(); props.onChangeReady('true'); }.bind(this)}>레디 버튼 </button>
            :
            <button className="raady_btn2" onClick={function (e) { e.preventDefault(); props.onChangeReady('false'); }.bind(this)}>레디 풀기 버튼 </button>
          }

          <button className="start_btn" onClick={ (e)=> { e.preventDefault(); props.onChangeStart('true'); timer()}}>시작 버튼</button>
          
          <h3>평균 ELO: </h3> 
          <h3>언어 : {round[0].language}</h3>
          <h3>인원 {round[0].max_people}/{round[0].people}</h3>
          <h3>라운드 : {round[0].rounds}</h3>
          </>
        :
        <>
          <button className="start_btn2" onClick={function (e) { e.preventDefault(); props.onChangeStart('false'); }.bind(this)}>시작 풀기 버튼</button>  
          <div style={{height:'30px'}}>
          <h3 style={{float:"left"}}>라운드 수 / {round[0].rounds} &nbsp;</h3>  
          <h3 style={{float:"left"}}>time: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
          </div>
        </>
      }
      </div>
      </div>
    </Box>
  )
}

export default GameSettingSection;
