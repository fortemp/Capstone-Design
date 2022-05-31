//게임방 설정 섹션
import React, { useEffect, useState, useContext, useRef } from 'react'
import {SocketContext} from '../../../api/socket'
import Box from '@material-ui/core/Box'
import "./GameSettingSection.css"

function GameSettingSection(props) {

  const socket = useContext(SocketContext);
  const roomSocket = socket.room;

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [room, setroom] = useState({});

  const [amIHost,setAmIHost] = useState(false);
  const [round, setRound] = useState(1);//1라운드부터 시작하니까 1로 초기화, 늘어나는건 socket응답 받을때 마다함
  var myObjectGlobal = undefined;
  var TimerVariable = undefined;
  var secondsGlobal = 0;
  var minutesGlobal = 0;
  useEffect(()=>{
    
    roomSocket.off('youAreBanned').on('youAreBanned',(data)=>{
      alert('강퇴당했습니다...');
      roomSocket.emit('leaveRoom');
      myObjectGlobal = undefined;
      setroom({})
      setAmIHost(false);
      props.onChangeMode('normal');
    })

    roomSocket.off('roomInfoGS').on('roomInfoGS',(data)=>{
      setroom(data)
    })

    roomSocket.off('gameStartingGS').on('gameStartingGS',(data)=>{
      TimerVariable = setInterval(()=>{
        if(secondsGlobal<59){
          setSeconds(seconds=>{
            secondsGlobal = seconds+1;
            return seconds+1;
          });
        }
        else{
          setSeconds(seconds=>{
            secondsGlobal = 0;
            return seconds-seconds;
          });
          setMinutes(minutes=>{
            return minutes+1
          });
        }
    },1000);
    })

    roomSocket.off('roomMeGS').on('roomMeGS',(data)=>{
      setAmIHost(data.me.host);
      myObjectGlobal = data.me;
    })

    roomSocket.off('roomPlayersGS').on('roomPlayersGS',(data)=>{//누군가 나가면(특히 방장을 위임할때 이게 필요함)
      if(myObjectGlobal){//누군가 나갈때마다 내가 host인지 아닌지 여기서 판장한다.
        for(let i=0;i<data.length;i++){
          if(typeof(data[i])==='object'){
            //이전에 저장해두었던 자신객체와 새로들어온 것과 비교한다.
            if(data[i].socketId===myObjectGlobal.socketId && data[i].host===true){
              myObjectGlobal.host = data[i];
              setAmIHost(true);
            }
          }
        }
      }
    })

  },[socket])

  const leaveRoomHandler=()=>{//방 나가는 함수
    myObjectGlobal = undefined;
    setroom({})
    setAmIHost(false);
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

  return (
    <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
      <div style={props.style}>
      <div>
      <button onClick={leaveRoomHandler}> 방나가기 </button>
      {props.start == "false" ?
        <>

          {/*방장은 게임시작만 보이고, 나머지는 레디,레디풀기가 보인다 */}
          {amIHost ? <>{<button className="start_btn" onClick={startHandler}>게임시작</button>}</> :
           <>{props.ready == "false" ?
           <button className="raady_btn" onClick={readyHandler}>레디</button>
           :
           <button className="raady_btn2" onClick={unReadyHandler}>레디 풀기</button>}</> }

          <h3>평균 ELO: </h3> 
          <h3>언어 : {room.language}</h3>
          <h3>인원 {room.people}&nbsp;/&nbsp;{room.max_people}</h3>
          <h3>라운드 : {room.rounds}</h3>
          </>
        :
        <>
          {/* <button className="start_btn2" onClick={ (e)=> { e.preventDefault(); props.onChangeStart('false');}}>시작 풀기 버튼</button>   */}
          <div style={{height:'30px'}}>
          <h3 style={{float:"left"}}>라운드: {round} / {room.rounds} &nbsp;</h3>  
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
