import api from './index'

// 방정보 가져오기
export async function getRoom(){
    const res = await api.get('/room/getrooms')
    return res;
}
//방만들기
export async function createRoom(data){
    const res = await api.post('/room/createroom',data);
    return res;
}

export async function getroominfo(){
    const res = await api.get('/room/getroominfo');
    return res;
}
export async function getproblem(data){
    const res = await api.post('/room/getproblem',data);
    return res;
}