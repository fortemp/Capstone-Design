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
         .then(res=>{
             if(!res.payload.auth){//로그인을 안했을 경우
                if(option){//option이 true이면,
                    return navigate('/login');
                }
            }else{
                if (adminRoute && !res.payload.isAdmin)//로그인은 해서, 어드민 페이지로 들어갔는데 어드민은 아님.
                    return props.history.push('/')
                if(option===false)
                    return navigate('/');
            }
            })}
        ,[])
        return (<SpecificComponent{...props} user={user}/>)
    }
    return <AuthenticationCheck/>
}
