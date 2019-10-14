import React,{Component} from 'react'

import {Card} from 'antd'

/**
 * 友情连接
 */
export default class FLink extends Component {


    render(){
        return  <Card className='flink'>
            <h2>友情连接</h2>
            <ul>
                <li><a href="https://github.com/chenliang15405" target="_blank">Github</a></li>
                <li><a href="https://blog.csdn.net/weixin_42054155" target="_blank">CSDN</a></li>
                <li><a href="https://www.jianshu.com/u/e699f2ee5224" target="_blank">简书</a></li>
                <li><a href="#">个人博客</a></li>
            </ul>
        </Card>

    }


}