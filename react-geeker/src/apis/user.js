import { request } from '@/utils';



export function login(data){
    return request({
        url: '/authorizations',
        method: 'post',
        data
    })
}