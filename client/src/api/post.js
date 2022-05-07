import api from './index'

//post 게시물입력, 출력
export async function postings(data){
    const res = await api.post('/post/postings',data)
    return res;
}
//게시물 가져오기
export async function getpost(){
    const res = await api.get('/post/getpost');
    return res;
}
//질문 투고하기
export async function setcomment(data){
    const res = await api.post('/post/setcomment',data)
    return res;
}
//질문 가져오기
export async function getcomment(){
    const res = await api.get('/post/getcomment');
    return res;
}
//최근 게시물 불러오기
export async function getrecentpost() {
    const res = await api.get('/post/getrecentpost');
    return res;
} 