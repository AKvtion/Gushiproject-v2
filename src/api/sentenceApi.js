import service from '../service.js'
import qs from 'qs'

//============ 诗句列表查询接口 =============
export function queryAllSentence(params) {
    return service({
        method: 'get',
        url: '/sentence/queryAll',
        params
    })
}

// 单个作者查询接口
export function sentenceOne(params) {
    return service({
        method: 'get',
        url: '/sentence/queryByName',
        params
    })
}


// 诗句列表删除接口
export function sentenceDel(id) {
    return service({
        method: 'delete',
        url: `/sentence/deleteById?id=${id}`
    })
}

// 诗句列表新增接口
export function sentenceAdd(data) {
    data = qs.stringify(data)
    return service({
        method: 'post',
        url: '/sentence/add',
        data
    })
}

// 诗句列表修改接口
export function sentenceEdit(data) {
    data = qs.stringify(data)
    return service({
        method: 'put',
        url: '/sentence/edit',
        data
    })
}