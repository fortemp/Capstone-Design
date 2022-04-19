import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import './GameSection.css'

function GameSection(props) {

  useEffect(() => {
    props.onChangeReady('false');
    setcodeInput(" ");
  }, []);
  useEffect(() => {

    setcodeInput(" ");
  }, []);

  const [codeInput, setcodeInput] = useState("");

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

  return (
    <Box className="Over2" style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>
      {props.start == "false" ?                           //랜딩페이지에서 받아오는 usestate 시작, 게임세팅섹션에서도 이용해야해서 랜딩페이지로부터 호출
        <>                                          
          <div className='gameroom_title'>
            <h3>NO.{"방제목 들어감"}</h3>
          </div>
          <div className='lating_room'>
            <div className='player'>
              <div className='player_name'>
                <div className='readydiv'>
                {props.ready == "false" ?
                 <img></img>:<img src="img/ready.png"></img>}
                </div>
                <div className="player_infodiv">
                  <span className='playername'>플레이어1</span>
                  <div className='exit'>
                    <button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 1강퇴"); }}>
                      <img className="exit_img" src="img/delete_47751.png"></img>
                      <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='player'>
              <div className='player_name'>
                <span>플레이어2</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 2 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어3</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 3 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어4</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 4 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어5</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 5 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어6</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 6 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어7</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 7 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어8</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 8 강퇴"); }}>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div>
          </div>
        </> : // 게임 시작하면 화면이 아래와 같이 바뀜
        <>
          <div className='Indexsection'>
            문제 들어갈곳
          </div>
          <div className='inputsection'>
            <textarea className="inputarea" value={codeInput} onKeyDown={codeInputTabHandler} onChange={codeInputHandler} />
          </div>
          <button className='submit_btn' onClick={submit_text}>제출</button></>}
    </Box>
  )
}

export default GameSection