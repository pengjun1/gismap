module.exports = {
  devServer: {
    // open: true,
    // host: '192.168.11.111',
    // port: 8888,
    // https: false,
    disableHostCheck:true,
    proxy: {
      '/api':{
        target: 'https://www.ahyicun.cn/maps',  // 后台api
        ws: true,
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': ''   //需要rewrite的,
        }
      }
    }
  },
  // publicPath:'/gismapPC'

}
