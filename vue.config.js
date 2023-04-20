/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:22
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-20 15:29:47
 */
module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                // target: 'http://1.116.64.64:5004/api2/',
                target: 'http://localhost:8081/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}