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