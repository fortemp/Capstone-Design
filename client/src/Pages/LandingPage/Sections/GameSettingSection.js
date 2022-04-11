//게임방 설정 섹션
import React, { useEffect, useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import "./GameSettingSection.css"

function GameSettingSection(props) {

 
    
    return (
        <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
            <button onClick={function (e) { e.preventDefault(); props.onChangeMode('normal'); }.bind(this)}>방에 나갔을 때 버튼 </button>
  
            <button className="raady_btn" onClick={function (e) { e.preventDefault(); props.onChangeReady('true'); }.bind(this)}>레디 버튼 </button>
            <button className="raady_btn2" onClick={function (e) { e.preventDefault(); props.onChangeReady('false'); }.bind(this)}>레디 풀기 버튼 </button>
 
        </Box>
    )
}

export default GameSettingSection
