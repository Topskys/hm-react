import { request } from "@/utils";


/**
 * 获取频道列表
 */
export function getChannel(){
    return request({
        url:'/channels'
    })
}