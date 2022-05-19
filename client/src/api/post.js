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
//조회수 업데이트
export async function viewUpdata(data){
    const res = await api.post('/post/viewUpdata', data);
    return res;
}
//댓글 입력
export async function setcomment(data){
    const res = await api.post('/post/setcomment',data)
    return res;
}
//댓글 가져오기
export async function getcomment(){
    const res = await api.get('/post/getcomment');
    return res;
}

//댓글 삭제
export async function commentdelete(data){
    const res = await api.post('/post/commentdelete',data)
    return res;
}
//댓글 수정
export async function commentupdata(data){
    const res = await api.post('/post/commentupdata',data)
    return res;
}

//최근 게시물 불러오기
export async function getrecentpost() {
    const res = await api.get('/post/getrecentpost');
    return res;
} 
//게시물삭제
export async function postdelete(data){
    const res = await api.post('/post/postdelete', data);
    return res;
}

//게시물수정
export async function postupdata(data){
    const res = await api.post('/post/postupdata', data);
    return res;
}