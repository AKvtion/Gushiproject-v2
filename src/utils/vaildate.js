/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:23
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-01-05 21:11:23
 */
// 用户名匹配
export function nameRule(rule, value, callback) {
    //  请输入4-10位昵称
    let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    if (value === "") {
        callback(new Error("请输入用户名"));
    } else if (!reg.test(value)) {
        callback(new Error("请输入4-10位用户名"));
    } else {
        callback();
    }
}

// 密码正则匹配
export function passRule(rule, value, callback) {
    //   6-12位密码需要包含大小写字母和数字以及特殊符号
    let pass = /^[A-Za-z0-9]+$/
    // let pass = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    if (value === "") {
        callback(new Error("请输入密码"));
    } else if (!pass.test(value)) {
        callback(new Error("6-12位密码需要包含大小写字母和数字及特殊符号"));
    } else {
        callback();
    }
}