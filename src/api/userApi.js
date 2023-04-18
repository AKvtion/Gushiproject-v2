// 项目中大多数时候都会把对应的接口请求封装成api来调用
import service from '../service.js'
import qs from 'qs'


//=========== 用户列表查询接口 ===========
export function queryAllUser(params) {
    return service({
        method: 'get',
        url: '/pUser/queryAll',
        params
    })
}

// 单个用户查询接口
export function userOne(params) {
    return service({
        method: 'get',
        url: '/pUser/queryByName',
        params
    })
}

// 用户列表删除接口
export function userDel(id) {
    return service({
        method: 'delete',
        url: `/pUser/deleteById?id=${id}`
    })
}

// 用户列表新增接口
export function userAdd(data) {
    data = qs.stringify(data)
    return service({
        // contentType: 'application/json;charset=UTF-8',
        method: 'post',
        url: '/pUser/add',
        data
    })
}

// 用户列表修改接口
export function userEdit(data) {
    data = qs.stringify(data)
    return service({
        method: 'put',
        url: '/pUser/edit',
        data
    })
}