import React,{useEffect} from 'react'
import {Link} from "react-router-dom"
import Box from '@material-ui/core/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './BoardSection.css'


function createData(count,post_title,poster,post_date){       //테이블 각 셀에 들어갈 데이터 타입(임시 작성)
  var Ranking_Cell={
      count: count,
      post_title: post_title,
      poster: poster,
      post_date: post_date
  } 
      return  Ranking_Cell ;
    } 
    const rows = [                         //테이블 각 셀에 들어갈 내용(임시 데이터)
      createData(1,'임시1',99+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(2,'임시2',99+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(3,'임시3',98+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(4,'임시4',97+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(5,'임시5',96+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(6,'임시6',95+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(7,'임시7',94+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),  
      createData(8,'임시8',93+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(9,'임시9',92+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2)),
      createData(10,'임시10',91+"%",('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+(new Date().getDate())).slice(-2))
    ];
  


function BoardSection(props) {

  
  return (
    <Box className='Over' style={props.style} bgcolor={"#888888"} p={2} >
    <span className='Boardtitle'>자유게시판</span>
    <TableContainer className='table'>
<Table aria-label="simple table"bgcolor={"#888888"}>
  <TableHead className='Tablehead'>
    <TableRow>
      <TableCell className='HeadCell1'align="center">글번호</TableCell>
      <TableCell className='HeadCell2'align="center">제목</TableCell>
      <TableCell className='HeadCell3'align="center">글쓴이</TableCell>
      <TableCell className='HeadCell4'align="center">작성일</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow
        key={row.name}
        sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
      >
        <TableCell className='Cell1'component="th" scope="row" align="center"> {row.count} </TableCell>
        <TableCell className='Cell2'align="left"> <Link to='/Posting'> {row.post_title}</Link></TableCell>
        <TableCell className='Cell3'align="center">{row.poster}</TableCell>
        <TableCell className='Cell4'align="center">{row.post_date}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
</Box>
)
}

export default BoardSection




/*import{Link} from "react-router-dom";
import React from 'react'

function CommunityPage() { //임시로 null

  return(
    <div>
      <Link to='/Posting'> 
        <button> 글작성 </button>
      </Link>
    </div>
  ); 
}

export default CommunityPage*/