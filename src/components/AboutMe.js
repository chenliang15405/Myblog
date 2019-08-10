import React, {Component} from 'react'

import {Card} from 'antd'

/**
 *  博主Card
 */
export default class AboutMe extends Component {


    render() {
        const { avatar, username, email, title, motto } = this.props.blogger
        return <Card className='aboutMe'>

            <div className='avatar'>
                <img src={avatar} alt=""/>
            </div>
            <div className='description'>
                <p>
                    <b><a href="https://github.com/chenliang15405">{ username }</a></b>
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