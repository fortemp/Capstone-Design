import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Box from '@material-ui/core/Box'
import './MainSection.css'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


import {useDispatch} from 'react-redux';
import { getRoom } from '../../../actions';



function MainSection(props) {
    const dispatch = useDispatch();

    const [login, setlogin] = useState("false");

//여기에 로그인이 성공하면 login을 true로 바꿔주는 코드가 필요함 roomsection 처럼하면 될듯?

 useEffect(()=>{
    dispatch(getRoom())
    .then(res=>{
      if(res.payload.success){
        setlogin("true"); 
      }
    })
  })


    return (
        <Box style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>

            <div className='User_Info_div'>
                {login == 'false' ?
                    <>
                        <div className='User_Avatar'>
                            <img className="phoneImage" alt="플레이어아바타" src="img/ch1.png" />
                        </div><div className='User_Info'>
                            <TableContainer>
                                <Table aria-label="simple table" bgcolor={"#ffffff"}>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center"style={{fontWeight: 'bolder', fontSize: '15px' }}>
                                            온라인 저지를 이용하기 위해서는 회원가입이 필수 입니다.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell className='Head_Cell' align="center">
                                            <Link to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>로그인</Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/signup" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>회원이 아니신가요?</Link></TableCell>
                                    </TableRow>
                                    
                                </Table>
                            </TableContainer>
                        </div>
                    </>:

                    <>
                        <div className='User_Avatar'>
                            <img className="phoneImage" alt="플레이어아바타" src="img/ch1.png" />
                        </div><div className='User_Info'>
                            <TableContainer>
                                <Table aria-label="simple table" bgcolor={"#ffffff"}>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>ID</TableCell>
                                        <TableCell className='Cell' align="center">prototype</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>이메일</TableCell>
                                        <TableCell className='Cell' align="center">prototype@naver.com</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>포인트</TableCell>
                                        <TableCell className='Cell' align="center">999pt</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Cell' align="center"></TableCell>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/shop" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>아바타 변경</Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>ID 변경</Link></TableCell>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>비밀번호 변경</Link></TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </div>
                    </>
                }
            </div>


            <div className='Main_div'>
                <h1>&nbsp;&nbsp; 최신글</h1>
                <ul>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>최신 게시글1</Link></li>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>최신 게시글2</Link></li>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>최신 게시글3</Link></li>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>최신 게시글4</Link></li>
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>최신 게시글5</Link></li>
                </ul>
            </div>
        </Box>
    )
}

export default MainSection