import React, {Component} from 'react';
import {Row, Card, Icon, Tag, Col, Pagination, BackTop} from 'antd'
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';


import AboutMe from '../../components/AboutMe'
import FLink from '../../components/FLink'
import TodayPoetry from '../../components/TodayPoetry'
import Banner from '../../components/Banner'

import {Timetransfer} from "../../utils/TimeUtil";

import { getBlogList, getBlogLabels, getBloggerInfo } from "../../api/home";

import '../../asserts/css/home.scss'

const {Meta} = Card;

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            blogList: [],        //issues 列表
            labelList: [],         //标签列表
            page: 1,        // 当前选中的页码
            pageSize: 6,     // 一页的数量
            blogger:{
                avatar: '',
                username: '',
                title: '',
                email: '',
                motto: '',
                address: '',
                birthday: '',
            }
        }
    }


    componentDidMount() {
        this.getBloggerInfo() // 获取我的信息

        this.getBlogList() //获取博客文章列表

        document.title = "唐宋"

        this.getBlogLabels() //获取博客标签列表

        //监听页面高度
        window.addEventListener("scroll",this.handlScroll)
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.handlScroll)
    }


    //获取博客文章列表
    getBlogList = async () => {
        const {page, pageSize} = this.state;
        try {
          const response = await getBlogList(page, pageSize, {})
          console.log("article : ", response)
          if (response.code === 20000) {
            const data = response.data
            const list = this.formatTime(data.rows)

            this.setState({
              total: data.total,
              blogList: list
            })
          }
        } catch (e) {
          console.log("getBlogList error: ", e)
        }
    }

    // 获取文章分类
    getBlogLabels = () => {
        getBlogLabels()
          .then(response => {
              if(response.code === 20000) {
                  console.log("labels: ",response)
                  const labels = response.data;
                  this.setState({
                    labelList: labels
                  })
              }
          })
          .catch(err => {
              console.log("getBlogLabels err",err)
          })
    }

    // 获取我的信息
    getBloggerInfo = () => {
        //登录，获取token
        getBloggerInfo()
          .then(response => {
              const data = response.data
              data.createDate = Timetransfer(data.createDate)
              data.birthday = Timetransfer(data.birthday)
              const {avatar, username, title, email, motto, address, birthday} = data
              const blogger = {
                    avatar,
                    username,
                    title,
                    email,
                    motto,
                    address,
                    birthday
              }
              this.setState({
                  blogger
              })
          })
          .catch(err => {
              console.log("blogger err: ", err)
          })
    }


    //标签去重
    //TODO 可以通过es6的set直接去重
    noRepeat = (data) => {
        if (!data) return [];
        const arr = [];
        data.map((item) => {
            if (item.categoryname && item.categoryname.split(",").length) {
                item.categoryname.split(",").map((vitem) => {
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
        console.log(page)
        this.setState({
            page
        },() => this.getBlogList())

    }



    //格式化时间
    formatTime = (data) => {
        if (data.length === 0) {
            return
        }
        data.map((item) => {
            item.createtime = Timetransfer(item.createtime);
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
        const { blogList, labelList } = this.state;
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
                        <AboutMe blogger={{...this.state.blogger}}/>

                        <Card bordered={false} className="catagory">
                            <h2>文章分类</h2>
                            <ul>
                                {
                                    labelList.map((value, key) => {
                                        return (
                                            <Link key={key} to={`/cloud/${value.categoryname}`}
                                                  style={{backgroundColor: `#${value.color}`}}>
                                                {value.categoryname}
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
                                  blogList.map((item, key) => {
                                        if (key < 9) {
                                            return (
                                                <li key={key}>
                                                    <Link to={`/blog/${item.id}`}>{item.title}</Link>
                                                </li>
                                            )
                                        }
                                        return ''
                                    })
                                }
                            </ul>
                        </Card>

                        {/*友情连接*/}
                        <FLink />
                        {/*TODO 目前是今日诗词，后面可以通过爬虫或者接口获取CSDN或者简书今日推荐的技术文章*/}
                        <TodayPoetry />
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
                    <Banner />

                    <QueueAnim
                        animConfig={[
                            {opacity: [1, 0], translateY: [0, 150]},
                            {opacity: [1, 0], translateY: [0, -150]}
                        ]}
                    >
                        {/*数据列表*/}
                        {
                            blogList && blogList.length ?
                                blogList.map((item, index) => {
                                    const time = Timetransfer(item.createtime)

                                    return (
                                        <Card key={index} className='blog-content'>
                                            <Meta
                                                title={<h3><Link to={`/blog/${item.id}`}>{item.title}</Link></h3>}
                                                description={
                                                    <Row>
                                                        <Row className='blog-info'>
                                                            <Col className='blog-time'><i className='canlendar'/>{time}
                                                            </Col>
                                                            <Col>
                                                                <Icon type='tags-o' className='list-icon'/>
                                                                {
                                                                    item.categoryName ?
                                                                        item.categoryName.split(",").map((val, key) => {
                                                                            return <Tag key={key} className='blog-tag'>
                                                                                {val}
                                                                            </Tag>
                                                                        })
                                                                        : null
                                                                }
                                                            </Col>

                                                            <Col className='blog-read-count'>
                                                                阅读数: { item.visits }
                                                            </Col>
                                                            <Col className='blog-read-count'>
                                                                评论: { item.comment }
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col className='blog-list-body'>{item.summary}</Col>
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
                            defaultCurrent={this.state.page}
                            defaultPageSize={this.state.pageSize}
                            total={this.state.total}
                            hideOnSinglePage={true} //指定只有1页时是否隐藏分页条
                            onChange={(page)=>this.pageChange(page)}
                            showQuickJumper
                            className='pagination'
                        />
                    </QueueAnim>

                </Row>


            </Row>
        )
    }


}