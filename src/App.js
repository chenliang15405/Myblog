import React, { Component } from 'react';
import logo from './logo.svg';
import {HashRouter as Router} from 'react-router-dom';
import {Row} from 'antd'

import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {



  render() {
    return (
        <Router>
          <div className="bg" id="bg">
              <Header/>
                <article>
                    <Row>
                        {/* 注意：this.props.children表示该组件的所有的子节点，在本项目，表示routerjs下面switch下面的所有的节点。保持header与footer不变*/}
                        {this.props.children}
                    </Row>
                </article>
              <Footer/>
          </div>
        </Router>
    );
  }
}

export default App;
