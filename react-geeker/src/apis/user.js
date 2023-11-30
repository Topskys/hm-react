import { request } from '@/utils';


/**
 * 登录
 * @param {*} data {mobile:"手机号",code:"验证码"}
 */
export function login(data){
    return request({
        url: '/authorizations',
        method: 'POST',
        data
    })
}