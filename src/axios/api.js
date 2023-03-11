import axios from "axios";

const instance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
    timeout : 1,
})

instance.interceptors.request.use(
    //요청을 보내기 전 수행되는 함수
    function(config){
        console.log('인터셉트 요청 성공!')
        return config
    },
    //요류 요청을 보내기 전 수행되는 함
    function(error){
        console.log('인터셉트 오류발생!')
        return Promise.reject(error)
    } 
)

instance.interceptors.response.use(
    //응답 보내기 전 수행되는 함수
    function(response){
        console.log('인터셉트 응답 성공')
        return response
    },
    //요류 응답을 보내기 전 수행되는 함
    function(error){
        console.log('인터셉트 오류 응답 발생!')
        return Promise.reject(error)
    } 
)

export default instance;