import React, { useEffect, useState,useRef,useCallback } from 'react';
import Box from '@material-ui/core/Box'
import "./ChatSection.css"





function ChatSection(props) {

  const [chattext, setText2] = useState([{ UserName: ' ', chattext2: '' }]);
  const [text, setText] = useState('');


  const onChange = (e) => {
    setText(e.target.value);
  };


  const submitChat = () => { // 입력포트값으로 정보 전달(버튼 눌렀을 때)
    if (text === ''){
    }
   else{
    const nexttext = chattext.concat({
      UserName: '플레이어1',
      chattext2: text
    });
    setText2(nexttext);
    setText('');
  }

  };
  
  const Enter = (e) => {          //엔터키 반응 함수
    if (e.key == 'Enter') {
      if (e.target.value === ''){
      }
     else{
      submitChat();
     }
    }
  }

  const messageRef = useRef();           //ref 지정
  const scrollToBottom = () => {         //스크롤 하단으로 옮기기 위한 함수
    messageRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  setTimeout(() => {                 //1초뒤 자동으로 스크롤 하강
    scrollToBottom();
  }, 1000);

  const animalList = chattext.map(name => <div className='chatlog'><span className='chat'>{name.UserName}</span><span className='chat'>{name.chattext2}</span></div>);

  return (                                                               //메시지 입력이 연속적으로 출력되지 않고 하나의 메시지만 출력됨( 고쳐야함 )
    <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
      <div id="Chatting" >
        {animalList}<div ref={messageRef}/></div>
      <div className='Submit'>
        <input className='Msg' type='text' value={text} name="txtChat" onChange={onChange} onKeyPress={Enter} autocomplete="off"/>
        <button className='SubmitBtn' type='button' name="txtChat" onClick={submitChat}>↑</button>
      </div>
    </Box>
  )
}
  
export default ChatSection