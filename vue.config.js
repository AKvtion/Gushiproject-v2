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