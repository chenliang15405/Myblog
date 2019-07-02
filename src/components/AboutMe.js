import React, {Component} from 'react'

import {Card} from 'antd'

import avatar from '../asserts/images/4.jpg'


export default class AboutMe extends Component {


    render() {
        const { avatar, username, email, title, motto, birthday, address } = this.props.blogger
        return <Card className='aboutMe'>

            <div className='avatar'>
                <img src={avatar} alt=""/>
            </div>
            <div className='description'>
                <p>
                    <b>{ username }</b>
                </p>
                <p>
                    <b>{ title }</b>
                </p>
                <p>{ email }</p>
                <p>{ motto }</p>
            </div>

        </Card>

    }


}