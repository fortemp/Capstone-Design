//게임방 설정 섹션
import React, { useEffect, useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import "./GameSettingSection.css"
import{Link} from "react-router-dom";
function GameSettingSection(props) {



    return (
        <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
            <Link to='/'><button>방에 나갔을 때 버튼 </button></Link>
            {props.start == "false" ?
                <>
                {props.ready == "false" ?
                <button className="raady_btn" onClick={function (e) { e.preventDefault(); props.onChangeReady('true'); }.bind(this)}>레디 버튼 </button>:
                <button className="raady_btn2" onClick={function (e) { e.preventDefault(); props.onChangeReady('false'); }.bind(this)}>레디 풀기 버튼 </button>}
                <button className="start_btn" onClick={function (e) { e.preventDefault(); props.onChangeStart('true'); }.bind(this)}>시작 버튼</button></>  //방장만 보이도록 해야함
                :
                <button className="start_btn2" onClick={function (e) { e.preventDefault(); props.onChangeStart('false'); }.bind(this)}>시작 풀기 버튼</button>
              }

        </Box>
    )
}

export default GameSettingSection
