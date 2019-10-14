---
---
### React 配置跨域有两种方式：

> 1. 在package.json中配置（打包之后直接使用npm serve启动react，才生效）
```
 "proxy":{ 
    "/api": {
      "target": "http://172.19.5.35:9536",
      "ws": true
    },
    "/apc": {
      "target": "http://179.19.5.35:9536",
      "ws": true
    }
  }
```

> 2.是react-created-app创建的项目，可以使用http-proxy-middleware配置（打包之后直接使用npm serve启动react, 才生效）

```
npm install http-proxy-middleware --save
// or
yarn add http-proxy-middleware

然后在src目录下创建 setupProxy.js 文件

最后设置代理

// setupProxy.js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {  //`api`是需要转发的请求 
      target: 'http://localhost:5000',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  )
}

// 可以直接给axios加上baseUrl 或者每个都单独写
axios.defaults.baseURL = '/api';

```


>3. 如果是直接打包放入到Nginx中使用，则通过nginx.conf配置代理

(1) 直接防止在nginx的根目录中：
```
location / {
    root /server/nginx/html/;
    index index.html index.htm;
}
```

(2) 将react项目作为nginx的根目录下的子目录进行访问   
  1. 配置router的路径   
  
  2. package.json中配置homepage   
  3. 使用打包命令   
  4. 配置nginx.conf

多环境打包：
https://www.jianshu.com/p/b24154123852