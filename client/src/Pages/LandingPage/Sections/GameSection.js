import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import './GameSection.css'

function GameSection(props) {


  return (
    <Box className="Over" style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>
    {props.ready=="false"?
      <><div className='gameroom_title'>
          <h3>NO.{"방제목 들어감"}</h3>
        </div><div className='lating_room'>
            <div className='player'>
              <div className='player_name'>
                <span>플레이어1</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 1강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div>
            <div className='player'>
              <div className='player_name'>
                <span>플레이어2</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 2 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어3</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 3 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어4</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 4 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어5</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 5 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어6</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 6 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어7</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 7 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div><div className='player'>
              <div className='player_name'>
                <span>플레이어8</span>
                <div className='exit'><button className='exit_btn' onClick={function (e) { e.preventDefault(); alert("플레이어 8 강퇴"); } }>
                  <img className="exit_img" src="img/delete_47751.png"></img>
                  <img className="exit_img2" src="img/close_round_delete_remove_icon_177274.png"></img>
                </button>
                </div>
              </div>
            </div>
          </div></>:<h1>게임화면</h1>}
    </Box>
  )
}

export default GameSection