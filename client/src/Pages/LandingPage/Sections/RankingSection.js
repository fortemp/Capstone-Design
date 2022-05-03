                                                                      // 랭킹 섹션
import React,{useEffect, useLayoutEffect, useState} from 'react'
import Box from '@material-ui/core/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './RankingSection.css'
import Axios from 'axios';



  
  
function RankingSection(props) {
  const [user, setuser]= useState([]); 
  useEffect(()=>{
    Axios.get('/api/auth/getranking'           //일단 이렇게 하면 유저 정보 가져오긴 함
).then((response)=>{
         setuser(response.data);    
       
   })
  },[])
  return (
    <Box className='Over' style={props.style} bgcolor={"#888888"} p={2} >
          <TableContainer>
      <Table aria-label="simple table"bgcolor={"#888888"}>
        <TableHead>
          <TableRow>
            <TableCell className='Cell' align="center">순위</TableCell>
            <TableCell className='Cell'align="center">ID</TableCell>
            <TableCell className='Cell'align="center">ELO</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
             // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
            >
              <TableCell className='Cell'component="th" scope="row" align="center">  {row.num} </TableCell>
              <TableCell className='Cell'align="center">{row.name}</TableCell>
              <TableCell className='Cell'align="center">{row.elo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default RankingSection