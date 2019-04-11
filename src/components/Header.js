import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {DatePicker,TimePicker} from 'antd'

import LOGO from '../asserts/images/logo.png'
import '../asserts/css/index.scss'

/**
 * 头部内容
 */
export default class Header extends Component {

    constructor(props){
        super(props)
        this.state={

        }
    }

    //TODO 将header作为fixed的width 100%的头版
    render() {
        return (
            <header>
                <div className='headerImgBox'>
                    {/*<img src={LOGO} alt="logo" id='headerImg'/>*/}
                </div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link to={'/'}>首页</Link>
                        </li>
                        <li>
                            <Link to={'/archive'}>归档</Link>
                        </li>
                        <li>
                            <Link to={'/archive'}>随笔</Link>
                        </li>
                        <li>
                            <Link to={'/archive'}>My Plan</Link>
                        </li>
                        <li>
                            <Link to={'/archive'}>关于</Link>
                        </li>
                        {/*TODO 可以做在公共blog*/}
                        <li>
                            <Link to={'/archive'}>资源分享</Link>
                        </li>
                        <li>
                            <DatePicker />
                            <TimePicker/>
                        </li>
                        {/*<li>*/}
                           {/*若不是生活所迫，谁会把自己弄的一身才华*/}
                        {/*</li>*/}
                    </ul>
                </nav>
            </header>
        )
    }

}



