import service from '../service.js'
import qs from 'qs'

// ================古诗列表查询接口============
export function queryAllPoetry(params) {
    return service({
        method: 'get',
        url: '/gushi/queryAll',
        params
    })
}

// 单个作者查询接口
export function gushiOne(params) {
    return service({
        method: 'get',
        url: '/gushi/queryByName',
        params
    })
}

// 古诗列表查询（没有分页）接口
// export function getInfo() {
//     return service({
//         method: 'get',
//         url: '/gushi/query',
//     })
// }

// 古诗列表删除接口
export function infoDel(id) {
    return service({
        method: 'delete',
        url: `/gushi/deleteById?id=${id}`
    })
}

// 古诗列表新增接口
export function infoAdd(data) {
    data = qs.stringify(data)
    return service({
        // contentType: 'application/json;charset=UTF-8',
        method: 'post',
        url: '/gushi/add',
        data
    })
}

// 古诗列表修改接口
export function infoEdit(data) {
    data = qs.stringify(data)
    return service({
        method: 'put',
        url: '/gushi/edit',
        data
    })
}