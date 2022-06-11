import React, { useEffect, useState,useContext} from 'react'
import {SocketContext} from '../../../api/socket'
import Box from '@material-ui/core/Box'
import Typography from '@mui/material/Typography';
import './GameSection.css'
import Player from '../../../components/player/Player';
import CodeSection from '../../../components/codeSection/CodeSection';
import {getproblem} from '../../../api/room'
import { Modal } from '@mui/material';
function GameSection(props) {

  const socket = useContext(SocketContext);
  const roomSocket = socket.room;
  const [problemId,setproblemId] = useState(null);
  const [problemIdArr,setProbleIdmArr] = useState([]);
  const [requestingProblem, setRequestingProblem] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [code, setCode] = useState("");
  const [roomTitle,setRoomTitle] = useState("불러오는중")
  const [Myobject, setMyobject] = useState({});//나의정보
  const [players, setPlayers] = useState([]);//플레이어들의 정보
  const [isRequesting,setIsRequesting] = useState(false);//현재 요청중인가
  const [language,setLanguage] = useState("c_cpp");//문법하이라이팅에 쓸 언어설정
  const [realLanguage, setRealLanguage] = useState('cpp');//진짜 컴파일할때 쓸 언어설정
  const [problem, setproblem] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [compileMessage,setCompileMessage] = useState('');
  const [compileLog,setCompileLog] = useState('');
  useEffect(() => {
    props.onChangeReady('false');
  }, []);

  useEffect(()=>{
    var myObjectGlobal;
    roomSocket.off('roomInfoG').on('roomInfoG',(data)=>{
      setRoomTitle(data.title)
      setRealLanguage(data.language);
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
      setCode("");
      setproblemId(data.problem_id.problem_id);//문제 아이디를 저장한다.
      setProbleIdmArr(problemIdArr=>[...problemIdArr, data.problem_id.problem_id])
      setRequestingProblem(true);
    })
    roomSocket.off('startGameErr').on('startGameErr',(data)=>{
      alert(data.message)
    })
    roomSocket.off('timeout').on('timeout',(data)=>{
      alert('타임아웃! 라운드가 끝났습니다.')
      if(Myobject.host){
        roomSocket.emit('roundEnded',problemIdArr)
      }
    })
    roomSocket.off('allPass').on('allPass',(data)=>{
      alert('한계인원까지 문제를 맞췄습니다. 라운드가 끝났습니다.')
      if(Myobject.host){
        roomSocket.emit('roundEnded',problemIdArr)
      }
    })
    roomSocket.off('WrongAnswer').on('WrongAnswer',(data)=>{
      setCompileMessage(data.message);
      setCompileLog(data.log);
      handleOpen();
    })
  },[socket])

  useEffect(()=>{
    if(problemId){
        getproblem({problem_id:problemId})
      .then((res)=>{
        setproblem(res.data.problem);
        setRequestingProblem(false);
        props.onChangeStart(true)
      })
    }
},[requestingProblem])



  const submit_text = () => {
    roomSocket.emit('sendCode',({code:code,languageParam:realLanguage,problem_idParam:problem.problem_id}))
  }

  const onChange=(e)=>{
    setCode(e);
  }

  const Eject = (host,whoSocket)=>{
    if(window.confirm('강퇴하시겠습니까?'))
      roomSocket.emit("Eject",{host,whoSocket,roomId});
  }

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
 
  const Problemstyle={
      'td':{
        border : '1px solid black',
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {compileMessage}
          </Typography>
          <Typography style={{whiteSpace:'pre-wrap'}}id="modal-modal-description" sx={{ mt: 2 }}>
            {compileLog}
          </Typography>
        </Box>
      </Modal>     
      </>                                              
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
          <div  style={{Problemstyle}} dangerouslySetInnerHTML={ {__html: `<h2>${problem.problem_id}:${problem.dirname}</h2><br/>${problem.description}`}}>
            </div>
           
          </div>
          <div className='inputsection'>
            <CodeSection style={{height: "600px",width: "100%"}} language={language} onChange={onChange}/>
          </div>
          <button className='submit_btn' onClick={submit_text}>제출</button></>}
      </Box>
    </div>
  )
}

export default GameSection