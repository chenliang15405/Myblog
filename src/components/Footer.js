import React, { Component } from 'react'

/**
 * 底部内容
 */
export default class Footer extends Component {

    render(){
        return (
            <footer className='footer'>
                <p>关于 | 学习 | 娱乐 | 成长 | Design by 唐宋个人主页</p>
                <p>Copyright © 2019 www.cl405.top All Rights Reserved.</p>
                <p>
                    <a href="http://www.beian.miit.gov.cn/" target="_blank">陕ICP备19025105号</a>
                </p>
            </footer>
        )
    }

}