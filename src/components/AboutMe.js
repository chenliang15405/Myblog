import React, {Component} from 'react'

import {Card} from 'antd'

import avatar from '../asserts/images/4.jpg'


export default class AboutMe extends Component {


    render() {
        return <Card className='aboutMe'>

            <div className='avatar'>
                <img src={avatar} alt=""/>
            </div>
            <div className='description'>
                <p>
                    <b>啦啦啦</b>
                </p>
                <p>
                    <b>全栈工程师</b>
                </p>
                <p>null@null.com</p>
                <p>读书，读自己！</p>
            </div>

        </Card>

    }


}