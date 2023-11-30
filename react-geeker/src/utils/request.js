/**
 * axios封装
 * 1.配置域名
 * 2.超时时间
 * 3.请求Token
 * 4.刷新token
 * 5.请求拦截器、响应拦截器
 */

import axios from 'axios'
import { getToken } from '@/utils';


const request = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 10000,
});


// 请求拦截器
request.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})


 // 响应拦截器
request.interceptors.response.use(response => {
    const { data } = response;
    if (data.code === 200) {
        return data.data;
    } else {
        return Promise.reject(data.msg);
    }
}, error => {
    return Promise.reject(error);
})


export default request;