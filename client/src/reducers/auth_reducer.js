import {AUTH_LOGIN} from "../actions/types"
import {AUTH_REGISTER} from "../actions/types"
import { AUTH_USER } from "../actions/types"
import { AUTH_LOGOUT } from "../actions/types"

const initialState = {
    loginSuccess:{success:null},
    registerSuccess:{success:null},
    authData:{auth:false,user:{}}
}


export default function auth_reducer(state=initialState,action){
    switch(action.type)
    {
        case AUTH_LOGIN:
            return{
                ...state,
                loginSuccess:action.payload
            }

        case AUTH_REGISTER:
            return{
                ...state,
                registerSuccess:action.payload
            }
        case AUTH_USER:
            return{
                ...state,
                authData:action.payload
            }
        case AUTH_LOGOUT:
            return{
                ...state,
                authData:{auth:false,user:{}}
            }
        default:
            return state
    }
}