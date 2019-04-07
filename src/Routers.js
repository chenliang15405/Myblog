import React ,{Component} from 'react';
import{HashRouter,Route,Switch} from 'react-router-dom';

import App from './App'
import Home from './pages/Home/Home'

export default class Routers extends Component {

    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }

}

