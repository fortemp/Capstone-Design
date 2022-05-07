import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import Box from '@material-ui/core/Box'
import './MainSection.css'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import {getrecentpost} from '../../../api/post'

function MainSection(props) {

    const isAuth = useSelector(state => state.authReducer.authData.auth); //인증여부
    const playerObj = useSelector(state => state.authReducer.authData.user);//사용자 정부객체
    const [isloadingU, setIsloadingU] = useState(true);//유저로딩중
    const [isloadingP, setIsloadingP] = useState(true);//게시글로딩중

    useEffect(() => {
        getrecentpost().
        then(res=>{
            setpost(res.data);
            setIsloadingP(false);
        })
    },[isloadingP])//recentpost는 한번가져옵니다.

    useEffect(() => {
        setdata(playerObj)
        setIsloadingU(false);
    },[playerObj,isAuth])//useSelector가 값을 가져오면 이를 인식해서 재렌더링 합니다.

    const [data, setdata] = useState({img_url:"불러오는중...",name:"불러오는중...",point:"불러오는중...",elo:"불러오는중..."});
    const [post, setpost] = useState([]);

    return (
        <Box style={props.style} bgcolor={"#888888"} color={"#222222"} p={2}>

            <div className='User_Info_div'>



                {isAuth === false ?
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

            {isloadingP === false ? 
            <div className='Main_div'>
                <h1>&nbsp;&nbsp; 최신글</h1>
                <ul>
                {post.map((row) => (
                    <li><Link to={`/PostPage/${row.post_id}`} style={{ textDecoration: 'none', color: 'black' }}>{row.title}</Link></li>
                    ))}
                </ul>
            </div> :

            <div className='Main_div'>
                Loading...
            </div>

            }


        </Box>
    )
}

export default MainSection