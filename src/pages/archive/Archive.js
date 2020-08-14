import React, {Component} from 'react'
import {List, message, Avatar, Spin, Icon,Timeline,BackTop} from 'antd';
import { Link } from 'react-router-dom';

import '../../asserts/css/archive.scss'
import {Timetransfer} from "../../utils/TimeUtil";

import { getBlogArchiveList } from '../../api/archive'

//设置icon的内容和type
const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
);

/**
 * 归档模块
 */
export default class Archive extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            archive: {
              pageSize: 6,
              page: 1,
              total: 0
            }
        }
    }

    componentWillMount() {
        this.getBlogArchiveList()
    }

    componentDidMount() {
        document.title = "唐宋-归档"

        //监听页面高度
        window.addEventListener('scroll', this.onScrollHandle);

    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.onScrollHandle);
    }


    onScrollHandle = (event) => {
        const clientHeight =  event.srcElement.body.clientHeight  //可视区域的高度
        const scrollHeight = event.srcElement.body.scrollHeight  //页面总高度
        const scrollTop = this.getScrollTop(); //滚动条的高度，不同浏览器获取的方式不一样，所以通过方法获取
        const isBottom = (clientHeight + scrollTop === scrollHeight)    //判断是否到达底部
        console.log('is bottom:' + isBottom)

        // let y = window.scrollY
        //let pageHeight = window.document.body.clientHeight //获取可视区域的高度
        //let pageHeight = window.document.body.scrollHeight  //全部网页的高度

        this.loadDataWithScroll(isBottom);

    }

    // 处理滚屏无限加载
    loadDataWithScroll = (isBottom) => {
        let { data, archive, hasMore } = this.state
        if(isBottom){
            // TODO 防抖函数，防止无限加载

            this.setState({
                loading: true,
            });
            // console.log(data.length)
            // console.log(data)
            if (data.length >= archive.total) {
                message.warning('Infinite List loaded all');
                this.setState({
                    hasMore: false,
                    loading: false,
                });
                return;
            }
            //获取数据
            hasMore && this.getBlogArchiveList()

        } else {

        }
    }

    // 获取归档博客列表
    getBlogArchiveList = () => {
        const { archive } = this.state
        // 页面每次加载6个
        getBlogArchiveList(archive.page, archive.pageSize)
            .then(response => {
                // console.log(`getBlogArchiveList: `,response)
                if(response.code === 20000) {
                    const data = response.data
                    archive.total = data.total  // 需要先给对象的属性赋值，然后再setState，否则覆盖该对象其他的值
                    archive.page = archive.page + 1 //滚屏加载则+1
                    let list = this.formatTime(data.rows)
                    list = this.state.data.concat(list) // 拼接之前的list
                    this.setState({
                      data: list,
                      archive,
                      loading:false
                    })
                }
            })
            .catch(err => {
              message.error('Server is not available');
            })
    }

    //获取到滚动条的高度
    getScrollTop = () => {
        var scroll_top = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scroll_top = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scroll_top = document.body.scrollTop;
        }
        return scroll_top;
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


    render() {
        return (
            <div className='archive-container'>
                <div className='slide-bar'>
                    <BackTop/>
                </div>
                <Timeline>
                    <List
                        itemLayout='vertical'
                        size='large'
                        dataSource={this.state.data}
                        // footer={<div><b>ant design</b> footer part</div>}
                        renderItem={item => (
                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>} color='blue'>
                                {item.createtime}
                                <List.Item
                                    key={item.title}
                                    actions={[<IconText type="eye-o" text={item.thumbup} />, <IconText type="like-o" text={item.thumbup} />, <IconText type="message" text={item.comment} />]}
                                    extra={<img className='blogImage' alt="images"
                                                src={item.image} />}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<h4><Link className='archiveTitle' to={`/blog/${item.id}`}>{item.title}</Link></h4>}
                                        description={<p>分类：{item.categoryName}</p>}
                                    />
                                    {item.summary}
                                </List.Item>
                            </Timeline.Item>
                        )}
                    >
                        {
                            this.state.loading && this.state.hasMore && (
                                <div className="loading-container">
                                    <Spin/>
                                </div>
                            )
                        }
                    </List>
                </Timeline>
            </div>
        )
    }

}