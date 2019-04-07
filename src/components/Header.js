import React, {Component} from 'react'

import {Link} from 'react-router-dom';

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


    render() {
        return (
            <header>
                <div className='headerImgBox'>
                    <img src={LOGO} alt="logo" id='headerImg'/>
                </div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link to={'/'}>首页</Link>
                        </li>
                        <li>
                            <Link to={'/archive'}>归档</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

}



