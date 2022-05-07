import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import Box from '@material-ui/core/Box'
import './MainSection.css'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../../../actions';
import Axios from 'axios';
function MainSection(props) {
    const dispatch = useDispatch();
    const [login, setlogin] = useState("false");
    const isAuth = useSelector(state => state.authReducer.authData.auth); // 사용자 정보 객체
    const playername = useSelector(state => state.authReducer.authData.user.name);



    //여기에 로그인이 성공하면 login을 true로 바꿔주는 코드가 필요함 roomsection 처럼하면 될듯?


    useEffect(() => {          //로그인 확인 코드
        if (isAuth == true) {                         
            setlogin("true"); 
               Axios.get('/api/auth/getuser',{              //일단 이렇게 하면 유저 정보 가져오긴 함
                   params: { 
                     'user': playername,
                   }
                 }).then((response)=>{
                      setdata(response.data);    
                    
                })
                Axios.get('/api/auth/getrecentpost',             //최근 게시글 불러오기
                ).then((response)=>{
                       setpost(response.data);    
                     
                 })
        }
    })
    const [data, setdata] = useState([]);
    const [post, setpost] = useState([]);
    /*
      useEffect(async()=>{   
       Axios.get('/api/auth/getuser',{
        params: { 
          'user': playername,
        }
      }).then((response)=>{
           setdata(response.data);    
           console.log(response.data);
         
     })
       },[])
    
*/
    return (
        <Box style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>

            <div className='User_Info_div'>
                {login == 'false' ?
                    <>
                        <div className='User_Avatar'>
                            <img className="phoneImage" alt="img/ch1.png" src="img/ch1.png" />
                        </div><div className='User_Info'>
                            <TableContainer>
                                <Table aria-label="simple table" bgcolor={"#ffffff"}>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>
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
                    </> :

                    <>
                        <div className='User_Avatar'>
                            <img className="phoneImage" alt="플레이어아바타" src={data.img_url} />
                        </div><div className='User_Info'>
                            <TableContainer>
                                <Table aria-label="simple table" bgcolor={"#ffffff"}>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>ID</TableCell>
                                        <TableCell className='Cell' align="center">{data.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>포인트</TableCell>
                                        <TableCell className='Cell' align="center">{data.point}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center" style={{ fontWeight: 'bolder', fontSize: '15px' }}>elo포인트</TableCell>
                                        <TableCell className='Cell' align="center">{data.elo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Cell' align="center"></TableCell>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/shop" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>아바타 변경</Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='Head_Cell' align="center">
                                            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: '15px' }}>이름 변경</Link></TableCell>
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
                {post.map((row) => (
                    <li><Link to={`/PostPage/${row.post_id}`} style={{ textDecoration: 'none', color: 'black' }}>{row.title.split('V',1)}</Link></li>
                    ))}
                </ul>
            </div>
        </Box>
    )
}

export default MainSection