import React, {Component} from 'react';
import {HashRouter as Router} from 'react-router-dom';
import { LocaleProvider } from 'antd'
import en from 'antd/lib/locale-provider/en_US';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Header from './components/Header'
import Footer from './components/Footer'

moment.locale('en');

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locale: null
        }
    }

    changeLocale = (e) => {
        const localeValue = e.target.value;
        this.setState({locale: localeValue});
        if (!localeValue) {
            moment.locale('en');
        } else {
            moment.locale('zh-cn');
        }
    }


    render() {
        return (
            <Router>
                {/*TODO 国际化以及其他的语言*/}
                <LocaleProvider locale={this.state.locale ? this.state.locale : en}>
                    <div className="bg" id="bg">
                        <div>
                            <Header/>
                            {/*<div>
                                <span style={{marginRight: 16}}>Change locale of components: </span>
                                <Radio.Group defaultValue={undefined} onChange={this.changeLocale}>
                                    <Radio.Button key="en" value={undefined}>English</Radio.Button>
                                    <Radio.Button key="cn" value={zh_CN}>中文</Radio.Button>
                                </Radio.Group>
                            </div>*/}
                        </div>
                        <article>
                            {/* 注意：this.props.children表示该组件的所有的子节点，在本项目，表示routerjs下面switch下面的所有的节点。保持header与footer不变*/}
                            {this.props.children}
                        </article>
                        <Footer/>
                    </div>
                </LocaleProvider>
            </Router>
        );
    }
}

export default App;
