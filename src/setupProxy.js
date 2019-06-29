// react配置跨域，和 请求代理

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(
    proxy('/api', {  //`api`是需要转发的请求
      target: 'http://localhost:9011',  // 这里是接口服务器地址
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "/"
      },
    })
  )
}