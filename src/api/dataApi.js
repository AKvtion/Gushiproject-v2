import service from '../service.js'

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
