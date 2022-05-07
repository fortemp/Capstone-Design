import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../actions/index'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GiteIcon from '@mui/icons-material/Gite';

function RightSide() {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authReducer.authData.auth);// 사용자 정보 객체
    const playername =useSelector(state => state.authReducer.authData.user.name)+'님 반갑습니다.';
    const logoutHandler = () => {
        dispatch(logoutUser())
            .then(res => {
                if (res.payload.success) {
                    window.location.reload();
                } else {
                    alert("실패했습니다." + res.payload.message);
                }
            })
    }
    const fontStyle = {

    };

    const [login, setlogin] = useState("false");
    useEffect(() => {          //로그인 확인 코드
        console.log(isAuth);
        if (isAuth == true)
            setlogin("true");
    })

    if (!isAuth) {
        return (
            <div>
                <div id="logo" >
                    <Button color="inherit" variant="h6" component="div">
                        <a href="/">
                            <span id="logotype">(C.C.C)</span>
                        </a>
                    </Button>
                </div>
                <div id="rightside">
                    <div className='Info'>
                        <textarea className='InfoMsg' resize='none' placeholder='로그인 후 이용해 주세요' disabled='false'>
                        </textarea>
                    </div>
                    <div className='Info2'>
                        <Button color="inherit"  onClick={function(){alert("로그인 후 이용해주세요")}}>
                                <BorderColorIcon
                                    sx={{
                                        color: "#333333"
                                    }} />
                                <span style={fontStyle}>COMMUNITY</span>                    
                        </Button>

                        <Button color="inherit" onClick={function(){alert("로그인 후 이용해주세요")}}>
                                <BorderColorIcon
                                    sx={{
                                        color: "#333333"
                                    }} />
                                <span style={fontStyle}>SHOP</span>

                        </Button>
                        <Button color="inherit">
                            <a href="/signup">
                                <BorderColorIcon
                                    sx={{
                                        color: "#333333"
                                    }} />
                                <span style={fontStyle}>signup</span>
                            </a>
                        </Button>

                        <Button color="inherit">
                            <a href="/login">
                                <LoginIcon
                                    sx={{
                                        color: "#333333"
                                    }} />
                                <span style={fontStyle}>login</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
            <div id="logo" >
                <Button color="inherit" variant="h6" component="div">
                    <a href="/">
                        <span id="logotype">(C.C.C)</span>
                    </a>
                </Button>
            </div>
            <div id="rightside">
                <textarea className='InfoMsg' resize='none' placeholder={playername} disabled='false'>
                </textarea>
                <div className='Info2'>
                    <Button color="inherit">
                        <a href="/community">
                            <BorderColorIcon
                                sx={{
                                    color: "#333333"
                                }} />
                            <span style={fontStyle}>COMMUNITY</span>
                        </a>
                    </Button>

                    <Button color="inherit">
                        <a href="/shop">
                            <BorderColorIcon
                                sx={{
                                    color: "#333333"
                                }} />
                            <span style={fontStyle}>SHOP</span>
                        </a>
                    </Button>
                    <Button color="inherit">
                        <a href="/host">
                            <GiteIcon
                                sx={{
                                    color: "#333333"
                                }} />
                            <span style={fontStyle}>host</span>
                        </a>
                    </Button>
                    <Button color="inherit">
                        <a onClick={logoutHandler} href="/">
                            <LogoutIcon
                                sx={{
                                    color: "#333333"
                                }} />
                            <span style={fontStyle}>logout</span>
                        </a>
                    </Button>
                </div>
            </div>
            </div>
        )
    }

}

export default RightSide