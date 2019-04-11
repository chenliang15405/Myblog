import React, {Component} from 'react'
import {Row, Col} from 'antd'

export default class BlogInfoFooter extends Component {


    render() {
        return (
            <footer>
                <Row>
                    <Row>
                        来源：<a>春哥技术博客</a>，欢迎分享，（春哥微信号：taike668）
                    </Row>
                    <Row>
                        点赞/分享
                    </Row>
                    <Row>
                        上一篇/下一篇？
                    </Row>
                    <Row>
                        用户信息
                    </Row>
                    <Row>
                        评论
                    </Row>
                    <Row>
                        评论列表
                    </Row>
                </Row>
            </footer>
        )
    }

}