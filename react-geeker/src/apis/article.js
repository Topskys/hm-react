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
 * 提交新增文章表单
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


/**
 * 根据文章编号删除文章
 * @param {*} id 文章编号
 */
export function delArticle(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}


/**
 * 根据文章编号查询文章详情数据
 * @param {*} id 
 */
export function getArticleById(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}



/**
 * 提交修改文章表单
 * @param {*} data
 */
export function updateArticle(data) {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}