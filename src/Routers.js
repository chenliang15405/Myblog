import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import App from './App'
import Home from './pages/home/Home'
import Archive from './pages/archive/Archive'
import Blog from './pages/blog/Blog'

console.log('REACT_APP_ROUTER_BASE_NAME: ', process.env.REACT_APP_ROUTER_BASE_NAME)
const routerConfig = !process.env.REACT_APP_ROUTER_BASE_NAME ? {} : {
    basename:process.env.REACT_APP_ROUTER_BASE_NAME
};

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

