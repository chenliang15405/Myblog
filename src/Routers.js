import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App'
// import Home from './pages/home/Home'
// import Archive from './pages/archive/Archive'
// import Blog from './pages/blog/Blog'

console.log('REACT_APP_ROUTER_BASE_NAME: ', process.env.REACT_APP_ROUTER_BASE_NAME)
const routerConfig = !process.env.REACT_APP_ROUTER_BASE_NAME ? {} : {
    basename:process.env.REACT_APP_ROUTER_BASE_NAME
};

// 按路由拆分代码
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return '加载中...'
    }
    else if (error) {
        console.log(error)
        return <div>页面出错了。。。</div>;
    }
    else {
        return null;
    }
}


const Home = Loadable({
    loader: () => import('./pages/home/Home'),
    loading: MyLoadingComponent
})

const Archive = Loadable({
    loader: () => import('./pages/archive/Archive'),
    loading: MyLoadingComponent
})

const Blog = Loadable({
    loader: () => import('./pages/blog/Blog'),
    loading: MyLoadingComponent
})

export default class Routers extends Component {

    render() {

      return (
        // /*<HashRouter basename='/blog'>*/  可能需要    <HashRouter>
            <HashRouter {...routerConfig}>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/archive' component={Archive}/>
                        <Route exact path='/blog/:id' component={Blog}/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }

}

