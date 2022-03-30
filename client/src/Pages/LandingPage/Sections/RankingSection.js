import React,{useEffect} from 'react'
import Box from '@material-ui/core/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import './RankingSection.css'


function createData(              //테이블 각 셀에 들어갈 데이터 타입(임시 작성)
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  } 
  const rows = [                         //테이블 각 셀에 들어갈 내용(임시 데이터)
    createData(1,'임시1',100+"%",999999),
    createData(2,'임시2',99+"%",999998),
    createData(3,'임시3',98+"%",999997),
    createData(4,'임시4',97+"%",999996),
    createData(5,'임시5',96+"%",999995),
    createData(6,'임시6',95+"%",999994),
    createData(7,'임시7',94+"%",999993),  
    createData(8,'임시8',93+"%",999992),
    createData(9,'임시9',92+"%",999991),
    createData(10,'임시10',91+"%",999990),
  ];

function RankingSection(props) {
  
  return (
    <Box style={props.style} bgcolor={"#888888"} p={2}>
          RankingSection
          <TableContainer>
      <Table aria-label="simple table"bgcolor={"#888888"}>
        <TableHead>
          <TableRow>
            <TableCell className='Cell'>순위</TableCell>
            <TableCell className='Cell'align="center">ID</TableCell>
            <TableCell className='Cell'align="center">승률</TableCell>
            <TableCell className='Cell'align="center">정답 갯수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className='Cell'component="th" scope="row"> {row.name} </TableCell>
              <TableCell className='Cell'align="right">{row.calories}</TableCell>
              <TableCell className='Cell'align="right">{row.fat}</TableCell>
              <TableCell className='Cell'align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default RankingSection