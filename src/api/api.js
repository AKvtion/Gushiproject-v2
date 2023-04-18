/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:22
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-18 21:29:27
 */
// 项目中我们大多数时候都会把对应的接口请求封装成api来调用
import service from '../service.js'
import qs from 'qs'

// 登录接口
export function login(data) {
    return service({
        method: 'post',
        url: '/pManager/login',
        data
    })
}

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

//=======轮播图接口=========
// 查询轮播图接口
export function queryAllCarousel(params) {
    return service({
        method: 'get',
        url: '/carousel/queryAll',
        params
    })
}

// 轮播图删除接口
export function CarouselDel(id) {
    return service({
        method: 'delete',
        url: `/carousel/deleteById?id=${id}`
    })
}

// 轮播图新增接口
export function CarouselAdd(data) {
    data = qs.stringify(data)
    return service({
        // contentType: 'application/json;charset=UTF-8',
        method: 'post',
        url: '/carousel/add',
        data
    })
}

// 轮播图修改接口
export function CarouselEdit(data) {
    data = qs.stringify(data)
    return service({
        method: 'put',
        url: '/carousel/edit',
        data
    })
}

// 信息列表新增和修改接口
// export function info(type, data) {
//     data = qs.stringify(data)
//     let obj = { method: type, url: '/info', data }
//     return service(obj)
// }

// 学生列表删除接口
export function studentDel(id) {
    return service({
        method: 'delete',
        url: `/students/${id}`
    })
}


// 数据概览接口
export function dataview() {
    return service({
        method: 'get',
        url: '/gushi/getConuntry'
    })
}

export function getCountView() {
    return service({
        method: 'get',
        url: '/gushi/getContent'
    })
}
// 旅游地图接口
export function travel() {
    return service({
        method: 'get',
        url: '/travel'
    })
}