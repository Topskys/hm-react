import { request } from "@/utils";


/**
 * 获取频道列表
 */
export function getChannel() {
    return request({
        url: '/channels'
    })
}

/**
 * 提交文章表单
 * @param {*} data 
 */
export function createArticle(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}


/**
 * 获取文章列表
 * @param {*} params
 */
export function getArticleList(params) {
    return request({
        url: `/mp/articles`,
        method: 'GET',
        params
    })
}