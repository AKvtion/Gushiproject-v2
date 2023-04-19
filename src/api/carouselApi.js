import service from '../service.js'
import qs from 'qs'

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

// 单个用户查询接口
export function userOne(params) {
    return service({
        method: 'get',
        url: '/pUser/queryByName',
        params
    })
}