import api from './index'

// 방정보 가져오기
export async function getRoom(){
    const res = await api.get('/room/getrooms')
    return res;
}