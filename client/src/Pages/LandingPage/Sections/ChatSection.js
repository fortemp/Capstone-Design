import React,{useEffect,useState} from 'react'
import Box from '@material-ui/core/Box'
import "./ChatSection.css"




function ChatSection(props) {

  const [chattext, setText2]=useState('');
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };
  const submitChat = ()=>{ // 입력포트값으로 정보 전달
   setText('');
   setText2(text);
  };

  const add='<span>'+chattext+'</span>';

  return (                                                               //메시지 입력이 연속적으로 출력되지 않고 하나의 메시지만 출력됨( 고쳐야함 )
    <Box style={props.style} bgcolor={"#888888"} color={"#222222"}  >               
         <div id="Chatting" dangerouslySetInnerHTML={{__html:add}}></div>    
         <div className='Submit'>                                
           <input className='Msg' type='text' value={text} name="txtChat" onChange={onChange} /> 
            <button className='SubmitBtn'type='button' name="txtChat" onClick={submitChat}>↑</button>
         </div>
    </Box>
  )
}

export default ChatSection