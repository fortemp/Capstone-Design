//게임방 설정 섹션
import React, { useEffect, useState, useContext, useRef } from 'react'
import {SocketContext} from '../../../api/socket'
import Box from '@material-ui/core/Box'
import "./GameSettingSection.css"
import { Link } from "react-router-dom";
import Axios from 'axios';
function GameSettingSection(props) {

  const socket = useContext(SocketContext);
  const roomSocket = socket.room;

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [round, setround] = useState([]);
  useEffect(() => {
    Axios.get('/api/room/getround', {              //일단 이렇게 하면 유저 정보 가져오긴 함
      params: {
        'title': 'ㄴㅇㅇ',           //방 제목으로 데이터베이스 접근하는데 어떻게 방제목을 가져와야할지 모르겠음
      }
    }).then((response) => {
      setround(response.data);
    })
  }, []);
  useEffect(()=>{
    roomSocket.off('youAreBanned').on('youAreBanned',(data)=>{
      alert('강퇴당했습니다...');
      roomSocket.emit('leaveRoom');
      props.onChangeMode('normal');
    })
  },[socket])

  const leaveRoomHandler=()=>{//방 나가는 함수
    roomSocket.emit('leaveRoom');
    props.onChangeMode('normal');
  }

  const readyHandler=()=>{
    roomSocket.emit('ready');
    props.onChangeReady('true');
  }
  const unReadyHandler=()=>{
    roomSocket.emit('unready');
    props.onChangeReady('false');
  }
  const startHandler=()=>{
    roomSocket.emit('startGame');
  }
  const timer = setInterval(()=>{
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
      <button onClick={leaveRoomHandler}> 방에 나갔을 때 버튼 </button>
      {props.start == "false" ?
        <>
          {props.ready == "false" ?
            <button className="raady_btn" onClick={readyHandler}>레디 버튼 </button>
            :
            <button className="raady_btn2" onClick={unReadyHandler}>레디 풀기 버튼 </button>
          }

          <button className="start_btn" onClick={startHandler}>시작 버튼</button>
          <h3>평균 ELO: 2000</h3></>  //방장만 보이도록 해야함
        :
        <>
          <button className="start_btn2" onClick={function (e) { e.preventDefault(); props.onChangeStart('false'); }.bind(this)}>시작 풀기 버튼</button>  
          <div style={{height:'30px'}}>
          <h3 style={{float:"left"}}>라운드 수 1 / {round.rounds} &nbsp;</h3>  
          <h3 style={{float:"left"}}>time: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
          </div>

        </>
      }
      </div>
      </div>
    </Box>
  )
}

export default GameSettingSection
