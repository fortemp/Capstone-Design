import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import Box from '@material-ui/core/Box'
import './MainSection.css'
import "../../../assets/scss/paper-dashboard.scss?v=1.3.0";
import NotificationAlert from "react-notification-alert";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import {getrecentpost} from '../../../api/post'
import {changedefault} from '../../../api/auth'
import {   UncontrolledAlert,    Alert,    Button,    Card,    CardHeader,    CardBody,    CardTitle,    Row,    Col,  } from "reactstrap";
function MainSection(props) {

    const isAuth = useSelector(state => state.authReducer.authData.auth); //인증여부
    const playerObj = useSelector(state => state.authReducer.authData.user);//사용자 정부객체
    const [isloadingU, setIsloadingU] = useState(true);//유저로딩중
    const [isloadingP, setIsloadingP] = useState(true);//게시글로딩중

    useEffect(() => {
        changedefault()
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
    console.log(post)
    return (
        <Box style={props.style} bgcolor={"#C35F5F"} color={"#222222"} p={2}>

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
              <Row>
              <Col md="12">
              <Card>
              <CardBody>
                <Row>
                  <Col >
                  <div className='User_Avatar'>
                  <img className="phoneImage" alt="플레이어아바타" src={data.img_url} />
                  </div>
                  </Col>
                  <Col md="6">
                        <div className='User_Info'>
                            <TableContainer style={{overflow:'hidden'}}>
                                <Table aria-label="simple table" bgcolor={"#ffffff"} > 
                                    <TableRow>
                                        <Row>
                                        <Col md="12">
                                        <Alert color="info" >
                                        <span className='span'><b>이름</b>{data.name}</span>
                                        </Alert>
                                        </Col>
                                        </Row>
                                    </TableRow>
                                    <TableRow>
                                    <Col md="12">
                                    <Alert color="success" >
                                        <span className='span'><b>포인트</b>{data.point}</span>
                                    </Alert>
                                    </Col>
                                    </TableRow>
                                    <TableRow>
                                    <Col md="12">
                                    <Alert color="warning" >
                                        <span className='span'><b>elo</b>{data.elo}</span>
                                    </Alert>
                                    </Col>
                                    </TableRow>
                                    <TableRow>
                                    <Row>
                                    <Col md="4.5">
                                     <Alert color="primary" >
                                     <Link to="/shop"><span className='span'><b>아바타 변경</b></span></Link>
                                    </Alert>
                                    </Col>
                                    <Col md="4.5">
                                    <Alert color="primary" >
                                     <Link to="/ChangeID"><span className='span'><b>닉네임변경</b></span></Link>
                                    </Alert>
                                    </Col>
                                    <Col md="4.5">
                                    <Alert color="primary" >
                                     <Link to="/ChangePWD"><span className='span'><b>비밀번호 변경</b></span></Link>
                                    </Alert>
                                    </Col>
                                    </Row>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        </div>
                        </Col>
              </Row>
            </CardBody>
            </Card>
            </Col>
            </Row>
                    </>
                } 
            </div>


            {isloadingP === false ? 
            <div className="content">   
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h5">최신 글</CardTitle>
                      </CardHeader>
                      <CardBody>
                 {post.map(element=>
                        <UncontrolledAlert color="primary" fade={false}>
                          <span className='span'>
                            < Link to={`/PostPage/${post.post_id}`} ><b>{post.title}</b></Link>
                            {element.created_at.substring(0,10)}
                          </span>
                        </UncontrolledAlert>
)}
                      </CardBody>
                    </Card>
                    <Col>
                    </Col>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
            </div> :

            <div className='Main_div'>
                Loading...
            </div>

            }


        </Box>
    )
}

export default MainSection