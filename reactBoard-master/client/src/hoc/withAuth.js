import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../actions/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Auth(SpecificComponent,option,adminRoute=null){

    //option: null:누구나, true:로그인한 유저만, false:로그인한 유저는 출입 불가
    function AuthenticationCheck(props){
        let user = useSelector(state => state.authReducer.authData.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
         dispatch(authUser())
         .then(async res=>{
             if(await !res.payload.auth){//로그인을 안했을 경우
                if(option){//option이 true이면,
                    navigate('/login');
                }
            }else{
                if(!option)
                    navigate('/');
            }
            })}
        ,[])
        return (<SpecificComponent{...props} user={user}/>)
    }
    return <AuthenticationCheck/>
}
