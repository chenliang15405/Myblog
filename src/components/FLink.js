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
                <li><a href="">Github</a></li>
                <li><a href="">CSDN</a></li>
                <li><a href="">简书</a></li>
                <li><a href="">个人博客</a></li>
            </ul>
        </Card>

    }


}