import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../actions/index'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GiteIcon from '@mui/icons-material/Gite';

function RightSide() {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authReducer.authData.auth);
    const playerobject = useSelector(state => state.authReducer.authData.user);// 사용자 정보 객체
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

    const [login, setlogin] = useState(false);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {          //로그인 확인 코드
        if (isAuth === true){
            setlogin(true);
            if(playerobject.is_admin){
                setAdmin(true)
            }
        }
            
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
                        <textarea className='InfoMsg' resize='none' placeholder='로그인 후 이용해 주세요' disabled='false'>
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

                        <Button color="inherit" onClick={function(){alert("로그인 후 이용해주세요")}}>
                                <ShoppingCartIcon
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
            </div>
        )
    } else {
        if(admin){
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
                    <textarea className='InfoMsg' resize='none' placeholder={`${playerobject.name}님 안녕하세요!`} disabled='false'>
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
                            <a href="/ProblemInsertpage">
                                <BorderColorIcon
                                    sx={{
                                        color: "#333333"
                                    }} />
                                <span style={fontStyle}>problemInsert</span>
                            </a>
                        </Button>
    
                        <Button color="inherit">
                            <a href="/shop">
                                <ShoppingCartIcon
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
                <textarea className='InfoMsg' resize='none' placeholder={`${playerobject.name}님 안녕하세요!`} disabled='false'>
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
                            <ShoppingCartIcon
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