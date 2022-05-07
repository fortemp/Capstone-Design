import React, { useEffect, useState,useRef,useCallback,useContext } from 'react';
import Box from '@material-ui/core/Box'
import "./ChatSection.css"
import {SocketContext} from '../../../api/socket'



function GameChatSection(props) {

  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState('');
  const socket = useContext(SocketContext);
  const roomSocket = socket.room;
  const publicSocket = socket.public;


  useEffect(()=>{
    //.off써주는거 중요함
  roomSocket.off('roomMessage').on('roomMessage',(data)=>{//방에서 채팅
    receiveChatHandler(data);
    scrollToBottom();
  })
  roomSocket.off('roomJoinedC').on('roomJoinedC',(data)=>{//누군가 방에 들어왔을때
    receiveChatHandler(data);
    scrollToBottom();
  })
  roomSocket.off('roomLeavedC').on('roomLeavedC',(data)=>{//누군가 방에서 나갔을때
    receiveChatHandler(data);
    scrollToBottom();
  })
  
  },[socket])


  const onChange = (e) => {
    setText(e.target.value);
  };

  const receiveChatHandler = (data) => { // 채팅이나 알림을받았을때
    const chatData = {
      UserName: data.name,//이름
      chattext2: data.message,//메세지
      fromWhom: data.fromWhom//나, 너, 알림중에 누구?
    }
    setChatList(chatList=>{ return  [...chatList, chatData]});
  }

  const submitChat = () => { // 입력포트값으로 정보 전달(버튼 눌렀을 때)
    if(text){
      roomSocket.emit('sendChat',text);
      setText('');
    }
  }

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

  const everyChatList = chatList.map((chat,index) =>{

    if(chat.fromWhom==='other')//상대가 보낸채팅
      return (<div className='chatlog'style={{width:'100%',textAlign:'left'}} > <span className='chat'>{chat.UserName}</span> <span className='chat' style={{backgroundColor:'#CAFFFF',borderRadius:'10px',width:'95%',textAlign:'left'}}>{chat.chattext2}</span> </div>)
    if(chat.fromWhom==='announce')//알림
      return (<div className='chatlog' style={{width:'100%',textAlign:'center'}} > <span className='chat' style={{color:'#FC5400'}} >알림</span> <span className='chat' >{chat.chattext2}</span> </div>)
    if(chat.fromWhom==='me')//내가보낸 채팅
      return (<div className='chatlog' style={{width:'100%',textAlign:'right'}}> <span className='chat'style={{color:'#FF4F4F'}} >{chat.UserName}</span> <span className='chat' style={{backgroundColor:'#CAFFFF', borderRadius:'10px',width:'95%',marginLeft:'5%'}}>{chat.chattext2}</span> </div>)
  });

  return (                                                               //메시지 입력이 연속적으로 출력되지 않고 하나의 메시지만 출력됨( 고쳐야함 )
    <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >
      <div id="Chatting" >
        {everyChatList}<div ref={messageRef}/></div>
      <div className='Submit'>
        <input className='Msg' type='text' value={text} name="txtChat" onChange={onChange} onKeyPress={Enter} autocomplete="off"/>
        <button className='SubmitBtn' type='button' name="txtChat" onClick={submitChat}>↑</button>
      </div>
    </Box>
  )

}

export default GameChatSection