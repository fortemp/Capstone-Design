import React, { useEffect, useState,useContext} from 'react'
import {SocketContext} from '../../../api/socket'
import Box from '@material-ui/core/Box'
import './GameSection.css'
import Player from '../../../components/player/Player';
import CodeSection from '../../../components/codeSection/CodeSection';

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
            <h5>임시 문제</h5>
            <p>신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.</p>
            <ul>
              <li>각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
                <ul>
                  <li>신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.</li>
                  <li>한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.</li>
                </ul>
              </li>
              <li>k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.</li>
              <ul><li>유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.</li></ul>
            </ul>
            <p>다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고, k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.</p>
            <table class="table12" border={1}>
              <thead>
                <tr>
                  <th>유저 ID</th>
                  <th>유저가 신고한 ID</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>"muzi"</th>
                  <th>"frodo"</th>
                  <th>"muzi가 frodo를 신고했습니다."</th>
                </tr>
                <tr>
                  <th>"apeach"</th>
                  <th>"frodo"</th>
                  <th>"apeach가 frodo를 신고했습니다."</th>
                </tr>
                <tr>
                  <th>"frodo"</th>
                  <th>"neo"</th>
                  <th>"frodo가 neo를 신고했습니다."</th>
                </tr>
                <tr>
                  <th>"muzi"</th>
                  <th>"neo"</th>
                  <th>"muzi가 neo를 신고했습니다."</th>
                </tr>
              </tbody>
            </table>
            <p>각 유저별로 신고당한 횟수는 다음과 같습니다.</p>
            <table class="table12" border={1}>
              <thead>
                <tr>
                  <th>유저 ID</th>
                  <th>신고당한 횟수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>"muzi"</th>
                  <th>1</th>
                </tr>
                <tr>
                  <th>"frodo"</th>
                  <th>2</th>
                </tr>
                <tr>
                  <th>"apeach"</th>
                  <th>0</th>
                </tr>
                <tr>
                  <th>"neo"</th>
                  <th>2</th>
                </tr>
              </tbody>
            </table>
            <p>위 예시에서는 2번 이상 신고당한 "frodo"와 "neo"의 게시판 이용이 정지됩니다. 이때, 각 유저별로 신고한 아이디와 정지된 아이디를 정리하면 다음과 같습니다.</p>
            <table class="table12" border={1}>
              <thead>
                <tr>
                  <th>유저 ID</th>
                  <th>유저가 신고한 ID</th>
                  <th>정지된 ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>"muzi"</th>
                  <th>["frodo", "neo"]</th>
                  <th>["frodo", "neo"]</th>
                </tr>
                <tr>
                  <th>"frodo"</th>
                  <th>["neo"]</th>
                  <th>["neo"]</th>
                </tr>
                <tr>
                  <th>"apeach"</th>
                  <th>["muzi", "frodo"]</th>
                  <th>["frodo"]</th>
                </tr>
                <tr>
                  <th>"neo"</th>
                  <th>없음</th>
                  <th>없음</th>
                </tr>
              </tbody>
            </table>
            <p>따라서 "muzi"는 처리 결과 메일을 2회, "frodo"와 "apeach"는 각각 처리 결과 메일을 1회 받게 됩니다.</p>
            <p>이용자의 ID가 담긴 문자열 배열 id_list, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열 report, 정지 기준이 되는 신고 횟수 k가 매개변수로 주어질 때, 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.</p>
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