import axios from 'axios'

const instance = axios.create({
    baseURL:process.env.REACT_APP_DB_HOST+'/api',
    withCredentials: true,
    timeout: 100000
})

instance.interceptors.request.use(
    config => {
        const {url, method, params, data} = config
        console.log(`[요청데이터]: ${JSON.stringify({url, params, method, data}, null, 2)}`)
        return config;
    },
    error=>{
        console.log(`"[요청에러]"+${error}`);
        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    response=>{
        console.log(`[응답데이터]: ${JSON.stringify(response.data, null, 2)}`)
        return response
    },
    error=>{
        console.log(`"[응답에러]"+${error}`);
        return Promise.reject(error);
    }
)

export default instance