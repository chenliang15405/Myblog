### React 项目发布步骤：
---

**1. 在本地运行则直接yarn start or npm start 即可**

**2. 但是如果是部署到nginx服务器，则需要做以下几个步骤：**

  (1) 修改package.json文件，增加homepage:
   例如：   
   `"homepage": "http://132.232.104.247/blog" `   
   其中ip是服务器的ip或者域名，blog为项目的部署在nginx中的子目录   
   如果是本地，可以指定为`"homepage": "." `   
   
**3. 并且在index.html中引入的js和css、图片等都需要使用相对路径，使用绝对路径找不到**

**4. 配置Router**

  -好像第4步不需要，也可以访问-
  
  可以通过打包时命令配置或者环境变量来配置该basename
  
  (1)在routers.js中加入配置
  ```js
    const routerConfig = !process.env.REACT_APP_ROUTER_BASE_NAME ? {} : {
        basename:process.env.REACT_APP_ROUTER_BASE_NAME
    };
   ```
  // 	这个basename 就是需要nginx访问的子目录
  ```html
      <!--<HashRouter basename='/blog'>-->
	  <HashRouter {...routerConfig}>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/archive' component={Archive}/>
                <Route exact path='/blog/:id' component={Blog}/>
            </Switch>
        </App>
      </HashRouter>
	
```

**5. 如果是上面的配置**  
  （1） 打包命令：   
  	`PUBLIC_URL=/blog REACT_APP_ROUTER_BASE_NAME=/blog yarn build`
  	
  （2） 如果是配置在环境配置文件中   
  TODO 如何配置
  
  
**6. nginx.conf配置**
    ```
    location /blog {
         try_files $uri /blog/index.html;
         root /server/nginx/html;
         autoindex on;
         autoindex_exact_size off;
         index index.html;
     }
    ```
    
&emsp;&emsp;**处理请求后台的代理配置：**   
&emsp;&emsp;// nginx.conf中代理配置

```
    location /api {
         proxy_pass http://47.98.232.143:9011/;
         proxy_set_header Host $host:$server_port;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    } 
```
说明：
   - 如果 `proxy_pass http://47.98.232.143:9011/` 后面带有/ 则表示去掉/api这个前缀
   - 如果 `proxy_pass http://47.98.232.143:9011` 后面没有带有/，则代理请求的时候自动加上/api
   - 去掉前缀的方法还有 `rewrite`

**7. 目前存在的问题**

直接访问http://132.232.104.247/blog ，然后url会变成
http://132.232.104.247/blog#/ 
	 

**8. 改成直接 http://132.232.104.247/ 这样的访问请求，就是直接将目录中的文件放在
	nginx的html的根目录下面，是可以直接访问到**


**9. 打包命令： **  
	`PUBLIC_URL=/blog REACT_APP_ROUTER_BASE_NAME=/blog yarn build`
//https://www.jianshu.com/p/0d07a0992042s
	
	
**10. 相对路径的配置**
如果引入的是相对路径，并且还是在Nginx的子目录下面，
则在nginx中配置location，不要使用 location / 配置即可，只配置精确的子目录的location 

例如： 
如果使用的是这样的相对路径引入的文件   
`<script type="text/javascript" src="./live/js/live2d.js"></script>	`

那么对应的nginx中配置为： 

```
  # location / {
  #    root /server/nginx/html/;
  #     index index.html;
  # } 
    
    // 只配置准确的location即可
    location /blog {
         try_files $uri /blog/index.html;
         root /server/nginx/html;
         autoindex on;
         autoindex_exact_size off;
         index index.html;
     }
     
```

	