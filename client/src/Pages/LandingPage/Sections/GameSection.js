import React, { useEffect, useState,useContext} from 'react'
import {SocketContext} from '../../../api/socket'
import Box from '@material-ui/core/Box'
import './GameSection.css'
import Player from '../../../components/player/Player';
import CodeSection from '../../../components/codeSection/CodeSection';
import Axios from 'axios';
function GameSection(props) {

  const socket = useContext(SocketContext);
  const roomSocket = socket.room;
  useEffect(() => {
    props.onChangeReady('false');
  }, []);

  useEffect(()=>{
    var myObjectGlobal;
    roomSocket.off('roomInfoG').on('roomInfoG',(data)=>{
      setRoomTitle(data.title)
      if(data.language==='c'||data.language==='cpp')//c랑 cpp는 문법 하이라이트가 c_cpp로 같다 따로 구분해줄 필요가 있음.
        setLanguage('c_cpp')
      else
        setLanguage(data.language);
      setRoomId(data.room_id);
      
    })
    roomSocket.off('roomPlayersG').on('roomPlayersG',(data)=>{
      let temp = [];
      let index = 0;
      for(let i = 0; i<data.length;i++){
        if(typeof(data[i])==="object"){//객체만따로뺌(나머지는 socketid임 필요X)
          temp[index] = data[i]
          index++;
        }
      }
      setPlayers(temp);
      if(myObjectGlobal){
        for(let i=0;i<temp.length;i++){
          if(temp[i].socketId===myObjectGlobal.socketId && temp[i].host===true){
            setMyobject(temp[i]);
          }
        }
      }
    })
    roomSocket.off('roomMeG').on('roomMeG',(data)=>{
      setMyobject(data.me)
      myObjectGlobal = data.me;
    })
    roomSocket.off('gameStarting').on('gameStarting',(data)=>{
      props.onChangeStart('true');
    })
    roomSocket.off('startGameErr').on('startGameErr',(data)=>{
      alert(data.message)
    })
  },[socket])

  const [roomId, setRoomId] = useState('');
  const [code, setCode] = useState("");
  const [roomTitle,setRoomTitle] = useState("불러오는중")
  const [Myobject, setMyobject] = useState({});//나의정보
  const [players, setPlayers] = useState([]);//플레이어들의 정보
  const [isRequesting,setIsRequesting] = useState(false);//현재 요청중인가
  const [language,setLanguage] = useState("c_cpp");
  const [problem, setproblem] = useState({});

  const submit_text = () => {
    roomSocket.emit('sendCode',code)
  }

  const onChange=(e)=>{
    setCode(e);
  }

  const Eject = (host,whoSocket)=>{
    if(window.confirm('강퇴하시겠습니까?'))
      roomSocket.emit("Eject",{host,whoSocket,roomId});
  }

  useEffect(()=>{

      Axios.get('/api/room/getproblem', {              //일단 이렇게 하면 방정보 가져오긴 함
      }).then((response) => {
    
        setproblem(response.data);
        console.log(problem)
        console.log(problem.length)
      })
    
  
  },[props.start])

  return (
    <Box className="Over2" style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>
      {props.start == "false" ?         //랜딩페이지에서 받아오는 usestate 시작, 게임세팅섹션에서도 이용해야해서 랜딩페이지로부터 호출
        <>
            <h3>방: {roomTitle}</h3>

          <div className='lating_room'>

          {/*player컴포넌트*/}
          {players.map((player,index)=>(
            <Player host={player.host} me={Myobject} ready={player.ready} playername={player.name}
             playerImg={player.img_url} Playerobject={player} Eject={Eject}/>
          ))}

          </div>
        </> : // 게임 시작하면 화면이 아래와 같이 바뀜
        <>
          <div className='Indexsection'>
          <div dangerouslySetInnerHTML={ {__html: problem[Math.floor(Math.random()*problem.length)].description}}>
            </div>
           
          </div>
          <div className='inputsection'>
            <CodeSection style={{height: "600px",width: "100%"}} language={language} onChange={onChange}/>
             {/* <textarea className="inputarea" value={codeInput} onKeyDown={codeInputTabHandler} onChange={codeInputHandler} /> */}
          </div>
          <button className='submit_btn' onClick={submit_text}>제출</button></>}
    </Box>
  )
}

export default GameSection