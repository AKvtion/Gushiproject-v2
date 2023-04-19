/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:22
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-19 10:38:21
 */
// 项目中大多数时候都会把对应的接口请求封装成api来调用
import service from '../service.js'

// 登录接口
export function login(data) {
    return service({
        method: 'post',
        url: '/pManager/login',
        data
    })
}

// 注册接口
export function register(data) {
    return service({
        method: 'post',
        url: '/pManager/register',
        data
    })
}