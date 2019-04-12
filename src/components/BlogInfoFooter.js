import React, {Component} from 'react'
import {Row, Col,Comment, Icon, Tooltip, Avatar} from 'antd'
import {Link} from 'react-router-dom';

/**
 * blog info footer
 */
export default class BlogInfoFooter extends Component {


    constructor(props) {
        super(props)
        this.state = {
            tags:['教程','js','java','后端']
        }
    }


    render() {
        return (
            <Row className='blog-info-footer'>
                <Row className='blog-footer-tags'>
                    <i className='iconfont'>&#xe676;</i>
                    标签: {
                        this.state.tags.map((item,key) => {
                            return (
                                <Link key={key}  to='' className='tag-item'>
                                    {item}
                                </Link>
                            )
                        })
                    }
                </Row>
                <Row className='copy-right'>
                    <div className={'copy-right-title'}>
                        文章版权及转载声明：
                    </div>
                    <div className='copy-right-statement'>
                        <p>作者:  <a style={{color:'red'}}>xxxx</a> ,https://www.talklee.com/blog/290.html,发布于 1年前 ( 2017-10-26 )</p>
                        <p>文章转载或复制请注明出处<a style={{color:'red'}}> 李洋个人博客</a></p>
                    </div>
                </Row>
                <Row className='share-great'>
                    <Col className='share-box'>
                        <div>
                            <span>分享: </span>
                        </div>
                        <div className='share-item'>
                            <i></i>
                            <a href="">微博</a>
                        </div>
                        <div className='share-item'>
                            <i></i>
                            <a href="">微信</a>
                        </div>
                        <div className='share-item'>
                            <i></i>
                            <a href="">QQ</a>
                        </div>
                    </Col>
                    <Col className='great-pay-box'>
                        <div className='great-but'>
                            <i className='iconfont great'>&#xe676;</i>
                            <span className='word'>  Start(10)</span>
                        </div>
                        <div className='pay-but'>
                            <i className='iconfont pay'>&#xe6c3;</i>
                            <span className='word'>支持一下</span>
                        </div>
                    </Col>

                </Row>
                <Row className='previous-next-box'>
                    <Row className='previous-next'>
                        <Col className='previous'>
                            <Link to=''>
                                <p>上一篇</p>
                                <span>zblog百度MIP轻奢主题Lightlee给你极速体验</span>
                            </Link>
                        </Col>
                        <div className='separator'></div>
                        <Col className='next'>
                            <Link to=''>
                                <p>上一篇</p>
                                <span>zblog百度MIP轻奢主题Lightlee给你极速体验</span>
                            </Link>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    {/*点击评论，会显示窗户需要填写信息*/}
                    用户信息
                </Row>
                <Row>
                    评论
                </Row>
                <Row>
                    评论列表
                </Row>
            </Row>
        )
    }

}