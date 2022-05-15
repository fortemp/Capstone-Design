import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import './GameSection.css'
import {useDispatch,useSelector} from 'react-redux';
import Axios from 'axios';
function GameSection(props) {

  const playername= useSelector(state=>state.authReducer.authData.user.name);
  const banish= useSelector(state=>state.authReducer.authData.user.name)+'  강퇴';
  
  useEffect(() => {
    props.onChangeReady('false');
    setcodeInput(" ");
  }, []);


  const [codeInput, setcodeInput] = useState("");
  const [problem, setproblem] = useState({});

  const codeInputTabHandler = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setcodeInput(codeInput + '\t');
    }
  }
  const codeInputHandler = (event) => {
    setcodeInput(event.currentTarget.value);
  }

  const submit_text = () => {
    alert("제출성공\n코드: " + codeInput.replace(/(\s*)/g, ""));
  }

  useEffect(()=>{

      Axios.get('/api/room/getproblem', {              //일단 이렇게 하면 방정보 가져오긴 함
      }).then((response) => {
    
        setproblem(response.data);
        console.log(problem)
        console.log(problem.length)
      })
    
  
  },[props.start])
  


  /*
  useEffect(() => {
    Axios.get('/api/room/getroominfo', {              //일단 이렇게 하면 방정보 가져오긴 함
      params: {
        'title':sessionStorage.getItem('title'),           //방 제목 가져옴
      }
    }).then((response) => {
      setround(response.data);
    })
  }, []);

  */



  return (
    <Box className="Over2" style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>
      {props.start == "false" ?                           //랜딩페이지에서 받아오는 usestate 시작, 게임세팅섹션에서도 이용해야해서 랜딩페이지로부터 호출
        <>
          <div className='gameroom_title'>
            <h3>{sessionStorage.getItem('title')}</h3>
          </div>
          <div className='lating_room'>
            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>{playername}</span>
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert(banish); }}>
                      <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch1.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어2</span>
                  
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 2강퇴"); }}>
                       <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch2.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어3</span>             
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 3강퇴"); }}>
                     <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch3.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어4</span>               
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 4강퇴"); }}>
                      <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch4.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어2</span>                 
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 5강퇴"); }}>
                    <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch5.png"></img></div>
            </div>

             <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어6</span>      
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 6강퇴"); }}>
                      <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch6.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어7</span>
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 7강퇴"); }}>
                     <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch7.png"></img></div>
            </div>

            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                  {props.ready == "false" ?
                    <img></img> : <img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어8</span>       
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 8강퇴"); }}>
                      <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="playerimg"><img src="img/ch8.png"></img></div>

            </div>
          </div>
        </> : // 게임 시작하면 화면이 아래와 같이 바뀜
        <>
          <div className='Indexsection'>
          <div dangerouslySetInnerHTML={ {__html: problem[Math.floor(Math.random()*problem.length)].description}}>
            </div>
           
          </div>
          <div className='inputsection'>
            <textarea className="inputarea" value={codeInput} onKeyDown={codeInputTabHandler} onChange={codeInputHandler} />
          </div>
          <button className='submit_btn' onClick={submit_text}>제출</button></>}
    </Box>
  )
}

export default GameSection