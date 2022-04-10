                                                                     //방찾기 섹션
import React,{useEffect, useState,useContext} from 'react'
import Box from '@material-ui/core/Box'
import {useDispatch} from 'react-redux';
import { getRoom } from '../../../actions';
import {SocketContext} from '../../../api/socket'
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
  const socket = useContext(SocketContext);
  const roomSocket = socket.room;
  const publicSocket = socket.public;
  const rowsPerPage = 4;
  const dispatch = useDispatch();

  
  useEffect(()=>{
    dispatch(getRoom())
    .then(res=>{
      if(res.payload.success){
        setRooms(res.payload.rooms);
        setLoading(false);
      }else{
        alert('방정보를 가져오는데 실패했습니다.')
      }
    })
  },[])
  useEffect(()=>{
      //.off써주는거 중요함
    roomSocket.off('roomError').on('roomError',(data)=>{
      alert(data.message)
    })

    
  },[socket])


  const handlePage = (event,newPage)=>{
    setPage(newPage)
  }

  const onClickRowhandler = (roomID,name,password) =>{
    roomSocket.emit('joinRoom',roomID,name,password)
  }
  
  return (
    <Box style={props.style} bgcolor={'#eeeeee'} p={2}>
      <button onClick={function(e){e.preventDefault(); props.onChangeMode('test');}.bind(this)}>방에 들어갔다 치고 하는 버튼</button>
      <button onClick={function(e){e.preventDefault(); props.onChangeMode('normal');}.bind(this)}>방에 나갔을 때 버튼 </button>
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
          .map(({_id,name,people,password},index)=>(
            <TableRow key = {_id} hover style={{cursor:'pointer'}} onClick={()=>onClickRowhandler(_id,name,password)}>
                <TableCell align="left" component="th" scope="row">
                  {Page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left">{name.substring(0,20)}</TableCell>
                <TableCell align="right">{people}</TableCell>
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

