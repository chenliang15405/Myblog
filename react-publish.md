### React 项目发布步骤：

> 1. 在本地运行则直接yarn start or npm start 即可

> 2. 但是如果是部署到服务器，则需要做以下几个步骤：   
  (1) 修改package.json文件，增加homepage:
   例如：   
   `"homepage": "http://132.232.104.247/blog" `   
   其中ip是服务器的ip或者域名，blog为项目的部署在nginx中的子目录   
   如果是本地，需要指定为`"homepage": "." `   
   
> 3. 并且在index.html中引入的js和css、图片等都需要使用相对路径，使用绝对路径找不到

> 4. 如果使用了路由，则需要在Router上面配置  basename='/blog'
  -好像第4步不需要，也可以访问-
  ```
	<HashRouter basename='/blog'>
		<App>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route exact path='/archive' component={Archive}/>
				<Route exact path='/blog/:id' component={Blog}/>
			</Switch>
		</App>
	</HashRouter>
	
	这个basename 就是需要nginx访问的子目录
```

> 5. 目前存在的问题：   
	直接访问http://132.232.104.247/blog ，然后url会变成
	http://132.232.104.247/blog#/ 
	 一些资源加载不到。。。   
	 访问http://132.232.104.247/blog/ 
	 就可以，不知道为什么
	 

> 6. 改成直接 http://132.232.104.247/ 这样的访问请求，就是直接将目录中的文件放在
	nginx的html下面，是可以直接访问到