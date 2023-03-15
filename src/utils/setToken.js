/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:23
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-03-11 15:39:48
 */
export function setToken(tokenKey, token) {
    return localStorage.setItem(tokenKey, token)
}

export function getToken(tokenKey) {
    return localStorage.getItem(tokenKey)
}

export function removeToken(tokenKey) {
    return localStorage.removeItem(tokenKey)    //移除localStorage存储的token
}