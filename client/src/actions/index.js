import {AUTH_LOGIN,AUTH_REGISTER,AUTH_USER,AUTH_LOGOUT} from "./types";
import { ROOM_GET,ROOM_JOIN,ROOM_OUT } from "./types";
import * as authApi from '../api/auth'
import * as roomApi from '../api/room'
export async function registerUser(data){
    const req = await authApi.register(data)
    .then(res=>(res.data))
    return {
        type:AUTH_REGISTER,
        payload: req
    }
}
export async function loginUser(data){
    const req = await authApi.login(data)
    .then(res=>res.data)

    return {
        type:AUTH_LOGIN,
        payload: req
    }
}
export async function authUser(){
    const req = await authApi.auth()
    .then(res=>res.data)

    return {
        type:AUTH_USER,
        payload: req
    }
}

export async function logoutUser(){
    const req = await authApi.logout()
    .then(res=>res.data);

    return {
        type:AUTH_LOGOUT,
        payload:req
    }
}

export async function getRoom(){
    const req = await roomApi.getRoom()
    .then(res=>res.data);

    return {
        type:ROOM_GET,
        payload:req
    }
}