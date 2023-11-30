/**
 * axios封装
 * 1.配置域名
 * 2.超时时间
 * 3.请求Token
 * 4.刷新token
 * 5.请求拦截器、响应拦截器
 */

import axios from 'axios'
import { getToken, removeToken } from '@/utils';
import router from '@/router';


const request = axios.create({
    baseURL: "http://geek.itheima.net/v1_0",
    timeout: 10000,
});


// 请求拦截器
request.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})


// 响应拦截器
request.interceptors.response.use(response => {
    const { data, status } = response;
    if (data.code === 200 || [200, 201].includes(status)) {
        return data;
    } else {
        return Promise.reject(data.msg);
    }
}, error => {
    // 大于2xx触发该函数
    if (error.response.status === 401) {
        removeToken();
        router.navigate("/login");
        // 防止navigate跳转失败，进行强制刷新
        window.location.reload();
    }

    return Promise.reject(error);
})


export default request;