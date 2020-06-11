module.exports = {
    publicPath:'/movie',
    devServer: {
        disableHostCheck: true,
        host: '192.168.43.2',

        proxy: {
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }
}