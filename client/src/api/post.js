import api from './index'

//post 게시물입력, 출력
export async function postings(data){
    const res = await api.post('/post/postings',data)
    return res;
}

export async function getpost(){
    const res = await api.get('/post/getpost');
    return res;
}

export async function viewUpdata(data){
    const res = await api.post('/post/viewUpdata', data);
    return res;
}

export async function setcomment(data){
    const res = await api.post('/post/setcomment',data)
    return res;
}

export async function getcomment(){
    const res = await api.get('/post/getcomment');
    return res;
}