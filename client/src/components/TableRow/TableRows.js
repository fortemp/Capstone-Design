import React from 'react'
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

function TableRows(props) {

  if(props.is_waiting){//호스트가 안들어온방: 준비중인방
    return(
      <TableRow  key = {props.room_id} hover style={{cursor:'pointer', backgroundColor:"#FF6666"}} onClick={()=>props.onClickRowhandler(props.room_id,props.title,props.ispass)}>
                
        <TableCell align="left" component="th" scope="row">
          {`${props.Page * props.rowsPerPage + props.index + 1}:${props.language}언어`}
        </TableCell>
        {props.ispass === 0 ? //비밀번호가있냐??
  
        <TableCell align="left">{`${props.title.substring(0,20)}`}</TableCell> :
  
        <TableCell align="left">{`${props.title.substring(0,20)}`}<LockIcon fontSize="small"/></TableCell>
        
        }
        <TableCell align="right">{`${props.people} / ${props.max_people}`}</TableCell>
  
      </TableRow>);
  }
  if(props.is_running){//현재 게임이 진행준인 방
    return(
      <TableRow  key = {props.room_id} hover style={{cursor:'pointer', backgroundColor:"#ACFFA8"}} onClick={()=>props.onClickRowhandler(props.room_id,props.title,props.ispass)}>
                
        <TableCell align="left" component="th" scope="row">
          {`${props.Page * props.rowsPerPage + props.index + 1}:${props.language}언어`}
        </TableCell>
        {props.ispass === 0 ? //비밀번호가있냐??
  
        <TableCell align="left">{`${props.title.substring(0,20)}`}</TableCell> :
  
        <TableCell align="left">{`${props.title.substring(0,20)}`}<LockIcon fontSize="small"/></TableCell>
        
        }
        <TableCell align="right">{`${props.people} / ${props.max_people}`}</TableCell>
  
      </TableRow>);
  }
  
  //호스트가 들어왔고 게임이 아직 진행중이 아닌방: 즉 레디중
  return(
    <TableRow  key = {props.room_id} hover style={{cursor:'pointer'}} onClick={()=>props.onClickRowhandler(props.room_id,props.title,props.ispass)}>
              
      <TableCell align="left" component="th" scope="row">
        {`${props.Page * props.rowsPerPage + props.index + 1}:${props.language}언어`}
      </TableCell>
      {props.ispass === 0 ? //비밀번호가있냐??

      <TableCell align="left">{`${props.title.substring(0,20)}`}</TableCell> :

      <TableCell align="left">{`${props.title.substring(0,20)}`}<LockIcon fontSize="small"/></TableCell>
      
      }
      <TableCell align="right">{`${props.people} / ${props.max_people}`}</TableCell>

    </TableRow>);
}

export default TableRows