/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-04-18 21:53:50
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-19 10:36:22
 */
import service from '../service.js'

// 数据概览接口
export function dataview() {
    return service({
        method: 'get',
        url: '/gushi/getCountry'
    })
}

export function getCountView() {
    return service({
        method: 'get',
        url: '/gushi/getContent'
    })
}
