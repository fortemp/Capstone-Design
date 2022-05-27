                                                                      // 랭킹 섹션
import React,{useEffect,useState} from 'react'
import Box from '@material-ui/core/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './RankingSection.css'
import {getranking} from '../../../api/auth'



  
  
function RankingSection(props) {
  const [user, setuser]= useState([]);
  const [isRequesting, setIsRequesting] = useState(true)
  useEffect(()=>{
    getranking()
    .then(res=>{
      setuser(res.data)
      setIsRequesting(false);
    }
    )
  },[isRequesting])
  return (
    <Box className='Over' style={props.style} bgcolor={"#4BAF4B"} p={2} >
          <TableContainer>
      <Table aria-label="simple table"bgcolor={"#FFFFFF"}>
        <TableHead>
          <TableRow>
            <TableCell className='Cell' align="center">순위</TableCell>
            <TableCell className='Cell'align="center">ID</TableCell>
            <TableCell className='Cell'align="center">ELO</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {!isRequesting ? 
          user.map((row) => (
            <TableRow
             // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
            >
              <TableCell className='Cell'component="th" scope="row" align="center">  {row.num} </TableCell>
              <TableCell className='Cell'align="center">{row.name}</TableCell>
              <TableCell className='Cell'align="center">{row.elo}</TableCell>
            </TableRow>
          )):
          <p>로딩중...</p>}

        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default RankingSection