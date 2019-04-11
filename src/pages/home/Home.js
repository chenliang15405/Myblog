import React, {Component} from 'react';
import {Row, Card, Icon, Tag, Col, Pagination, BackTop} from 'antd'
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios'
import QueueAnim from 'rc-queue-anim';


import AboutMe from '../../components/AboutMe'
import FLink from '../../components/FLink'
import TodayPoetry from '../../components/TodayPoetry'
import Banner from '../../components/Banner'

import {Timetransfer} from "../../utils/TimeUtil";

import '../../asserts/css/home.scss'

const {Meta} = Card;

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            artNum: 0,
            list: [],        //issues 列表
            labelList: [],         //标签列表
            nowPageIssues: [],
            page: 1,        // 当前选中的页码
            pageNum: 6,     // 一页的数量
        }
    }


    componentDidMount() {
        this.getIssuesList();//获取issue数据列表

        const {page, pageNum} = this.state;
        document.title = "读心"

        // this.setState({nowPageIssues: this.state.list.slice(0 + pageNum * (page - 1), pageNum + pageNum * (page - 1))})

        this.getBlogLabels();//获取博客标签列表

        //监听页面高度
        window.addEventListener("scroll",this.handlScroll)
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.handlScroll)
    }


    //获取issues数据列表
    getIssuesList = () => {
        const {page, pageNum} = this.state;
        //获取博客内容
        axios.get(`https://api.github.com/repos/weiyongyuan94/blogtext/issues`, {
            params: {
                creator: 'weiyongyuan94',
                client_id: 'a5636a8f618a5ce0c877',
                client_secret: '054b02cccd28b32a030b4ac7778384fc3fe7e812',
            }
        }).then(response => {
            console.log("issues ")
            console.log(response)
            if (response.status === 200) {
                const data = response.data;
                const list = this.formatTime(data);

                this.setState({
                    artNum: data.length,
                    list: list,
                    nowPageIssues: list.slice(0 + pageNum * (page - 1), pageNum + pageNum * (page - 1))
                })
            }
        })
    }

    //获取博客标签列表
    getBlogLabels = () => {
        axios.get(`https://api.github.com/repos/weiyongyuan94/blogtext/issues`, {
            params: {
                creator: 'weiyongyuan94',
                client_id: 'a5636a8f618a5ce0c877',
                client_secret: '054b02cccd28b32a030b4ac7778384fc3fe7e812',
            },
        }).then((response) => {
            console.log("label : ")
            console.log(response)
            if (response.status === 200) {
                // 进行时间格式统一处理
                const data = response.data;
                this.noRepeat(data)
            } else {

            }
        });
    }

    //标签去重
    //TODO 可以通过es6的set直接去重
    noRepeat = (data) => {
        if (data.length === 0) return [];
        const arr = [];
        data.map((item) => {
            if (item.labels && item.labels.length) {
                item.labels.map((vitem) => {
                    arr.push(vitem);
                    return ''
                })
            }
            return ''
        })
        let obj = {};
        const person = arr.reduce((cur, next) => {
            if (!obj[next.id]) {
                cur.push(next);
                obj[next.id] = true
            }
            return cur;
        }, [])
        this.setState({
            labelList: person

        })
    }


    //改变页码
    pageChange = (page) => {
        let nowPageIssues = this.state.list.slice(0 + this.state.pageNum * (page - 1), this.state.pageNum + this.state.pageNum * (page - 1))
        this.setState({
            page,
            nowPageIssues
        })
    }



    //格式化时间
    formatTime = (data) => {
        if (data.length === 0) {
            return
        }
        data.map((item) => {
            item.created_at = Timetransfer(item.created_at);
            return ''
        })
        return data;
    }


    handlScroll = (event) => {
        let jt = this.refs.returnTop;
        if(window.scrollY <= 500){
            jt.setAttribute('style','display:none;')
        } else {
            jt.setAttribute('style','display:visible;')
        }
    }



    render() {
        const {list, labelList, nowPageIssues, page, pageNum} = this.state;
        return (
            <Row className='main-container'>
                <Row className="l_box">
                    <QueueAnim
                        animConfig={[
                            {opacity: [1, 0], translateY: [0, 150]},
                            {opacity: [1, 0], translateY: [0, -150]}
                        ]}
                    >
                        {/*about me*/}
                        <AboutMe/>

                        <Card bordered={false} className="catagory">
                            <h2>文章分类</h2>
                            <ul>
                                {
                                    labelList.map((value, key) => {
                                        return (
                                            <Link key={key} to={`/cloud/${value.name}`}
                                                  style={{backgroundColor: `#${value.color}`}}>
                                                {value.name}
                                            </Link>
                                        )
                                    })
                                }
                            </ul>
                        </Card>
                        <Card bordered={false} className="current-article">
                            <h2>最近文章</h2>
                            <ul>
                                {
                                    list.map((item, key) => {
                                        if (key < 9) {
                                            return (
                                                <li key={key}>
                                                    <Link to={`/blog/${item.number}`}>{item.title}</Link>
                                                </li>
                                            )
                                        }
                                        return ''
                                    })
                                }
                            </ul>
                        </Card>

                        {/*友情连接*/}
                        <FLink/>
                        {/*TODO 目前是今日诗词，后面可以通过爬虫或者接口获取CSDN或者简书今日推荐的技术文章*/}
                        <TodayPoetry/>
                    </QueueAnim>
                </Row>

                {/*TODO 可以做一个fixed的bar，上面有qq weixin app的二维码，通过hover标签可以控制display:none 展示二维码*/}
                <Row className='slide-bar'>
                    <BackTop/>
                    <ul>
                        <li ref='returnTop'>》</li>
                        <li>QQ</li>
                        <li>WX</li>
                    </ul>
                </Row>

                <Row className='r_box'>
                    {/*轮播*/}
                    <Banner/>
                    <QueueAnim
                        animConfig={[
                            {opacity: [1, 0], translateY: [0, 150]},
                            {opacity: [1, 0], translateY: [0, -150]}
                        ]}
                    >
                        {/*数据列表*/}
                        {
                            this.state.nowPageIssues && this.state.nowPageIssues.length ?
                                this.state.nowPageIssues.map((item, index) => {
                                    const time = Timetransfer(item.created_at)

                                    return (
                                        <Card key={index} className='blog-content'>
                                            <Meta
                                                title={<h3><Link to={`/blog/${item.number}`}>{item.title}</Link></h3>}
                                                description={
                                                    <Row>
                                                        <Row className='blog-info'>
                                                            <Col className='blog-time'><i className='canlendar'/>{time}
                                                            </Col>
                                                            <Col>
                                                                <Icon type='tags-o' className='list-icon'/>
                                                                {
                                                                    item.labels && item.labels.length ?
                                                                        item.labels.map((val, key) => {
                                                                            return <Tag key={key} className='blog-tag'>
                                                                                {val.name}
                                                                            </Tag>
                                                                        })
                                                                        : null
                                                                }
                                                            </Col>

                                                            <Col className='blog-read-count'>
                                                                阅读数: 999
                                                            </Col>
                                                            <Col className='blog-read-count'>
                                                                评论: 66
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col className='blog-list-body'>{item.body}</Col>
                                                        </Row>
                                                    </Row>
                                                }
                                            />
                                        </Card>
                                    )
                                })
                                : null
                        }
                        {/*分页*/}
                        <Pagination
                            current={this.state.page}
                            onChange={(page)=>this.pageChange(page)}
                            total={this.state.list.length}
                            hideOnSinglePage={true} //指定只有1页时是否隐藏分页条
                            className='pagination'
                        />
                    </QueueAnim>

                </Row>


            </Row>
        )
    }


}