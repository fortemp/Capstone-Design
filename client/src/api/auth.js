import api from './index'

// post가입
export async function register(data) {
    const res = await api.post('/auth/register', data)
    return res;
}
// post 로그인
export async function login(data) {
    const res = await api.post('/auth/login', data);
    return res;
}
//인증
export async function auth(){
    const res = await api.get('/auth/auth');
    return res;
}
//로그아웃
export async function logout(){
    const res = await api.get('/auth/logout');
    return res;
}
//아이디중복검사
export async function dupcheck(data){
    const res = await api.post('/auth/dupcheck',data);
    return res;
}
//유저정보 불러오기
export async function getuser() {
    const res = await api.get('/auth/getuser');
  return res;
}
export async function gettitle() {
    const res = await api.get('/auth/gettitle');
  return res;
}
export async function getrecentpost() {
    const res = await api.get('/auth/getrecentpost');
    return res;
} 
export async function buyimg() {
    const res = await api.get('/auth/buyimg');
    return res;
}
export async function changeimg() {
    const res = await api.get('/auth/changeimg');
    return res;
}
export async function getranking() {
    const res = await api.get('/auth/getranking');
    return res;
}