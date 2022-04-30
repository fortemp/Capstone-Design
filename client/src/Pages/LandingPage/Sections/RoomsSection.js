                                                                     //방찾기 섹션
import React,{useEffect, useState,useContext} from 'react'
import Box from '@material-ui/core/Box'
import {useDispatch} from 'react-redux';
import { getRoom } from '../../../api/room'
import {SocketContext} from '../../../api/socket'
import LockIcon from '@mui/icons-material/Lock';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@material-ui/core";

function RoomsSection(props) {


  const [Page, setPage] = useState(0);
  const [rooms,setRooms] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);//기본값: 요청을 보내고있지않으니 false
  const socket = useContext(SocketContext);
  const roomSocket = socket.room;
  const publicSocket = socket.public;
  const rowsPerPage = 4;//테이블 한 페이지당 들어갈 방개수
  const dispatch = useDispatch();

  const onClickRowhandler = (room_id,title,ispass) =>{
    console.log(room_id,title,ispass);
    let password = ""
    if(ispass===1){
      password = prompt("비밀번호를 입력해주세요");
      if(password===null || password===undefined || password==="")
        return;
    }
    setRequesting(true);//소켓요청
    roomSocket.emit('joinRoom',room_id,title,password);
  }
  
  useEffect(()=>{
    getRoom()
    .then(res=>{
      if(res.data.success){
        setRooms(res.data.rooms);
        setLoading(false);
        setRequesting(false);//요청 완료
      }else{
        alert('방정보를 가져오는데 실패했습니다.')
      }
    })
  },[requesting])//소켓요청이 들어올때마다 재렌더링; useEffect문을 실행함

  useEffect(()=>{
      //.off써주는거 중요함
    roomSocket.off('roomError').on('roomError',(data)=>{
      alert(data.message)
    })

    roomSocket.off('roomJoinedR').on('roomJoinedR',(data)=>{//방에 들어오면 나에게 alert를 띄워준다.
      alert(data.message)
    })

    roomSocket.off('refreshR').on('refreshR',(data)=>{//누군가방에 들어오면 재렌더링
      setRequesting(true);//소켓요청
    })

    roomSocket.off('roomLeaveR').on('roomLeaveR',(data)=>{//방 나가면 재렌더링 나가는건 alert안띄운다
      setRequesting(true);//소켓요청
    })
    
  },[socket])


  const handlePage = (event,newPage)=>{
    setPage(newPage)
  }

  setTimeout(() => {//3초마다 방정보 불러옴
    setRequesting(true);
  }, 3000);
  
  return (
    <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
      <button onClick={function(e){e.preventDefault(); props.onChangeMode('test');}.bind(this)}>방에 들어갔다 치고 하는 버튼</button>
      <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='left'>No</TableCell>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='right'>people</TableCell>
          </TableRow>
        </TableHead>
        {Loading === false ?
        
        <TableBody>
          {rooms
          .slice(Page * rowsPerPage , (Page+1) * rowsPerPage)
          .map(({room_id,title,people,max_people,ispass,language,is_running,is_waiting},index)=>(


            <TableRow key = {room_id} hover style={{cursor:'pointer'}} onClick={()=>onClickRowhandler(room_id,title,ispass)}>
              
                <TableCell align="left" component="th" scope="row">
                  {`${Page * rowsPerPage + index + 1}:${language}언어`}
                </TableCell>
                {ispass === 0 ? //비밀번호가있냐??

                <TableCell align="left">{`${title.substring(0,20)}`}</TableCell> :

                <TableCell align="left">{`${title.substring(0,20)}`}<LockIcon fontSize="small"/></TableCell>
                
                }
                <TableCell align="right">{`${people} / ${max_people}`}</TableCell>

            </TableRow>


          ))}

        </TableBody> : 
        <span style={{fontSize:'50px'}}>
        loading...
        </span>
        
        }
        {!Loading &&
        <TableFooter>
          <TableRow>
            <TablePagination
              count={rooms.length}
              page={Page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePage}
              rowsPerPageOptions={[rowsPerPage]}
            />
          </TableRow>
        </TableFooter>        
        }
      </Table>
    </TableContainer>
    </Box>
  )
}

export default RoomsSection

