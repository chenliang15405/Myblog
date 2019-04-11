import React, {Component} from 'react'
import {List, message, Avatar, Spin, Icon,Timeline,BackTop} from 'antd';

import '../../asserts/css/archive.scss'


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
        }
    }

    componentWillMount() {
        //模拟数据
        const data = [];
        for (let i = 0; i < 6; i++) {
            data.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
        this.setState({data})
    }

    componentDidMount() {
        document.title = "归档"

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
    
    loadDataWithScroll = (isBottom) => {
        let data = this.state.data;
        if(isBottom){
            this.setState({
                loading: true,
            });
            if (data.length > 14) {
                message.warning('Infinite List loaded all');
                this.setState({
                    hasMore: false,
                    loading: false,
                });
                return;
            }
            //获取数据
            data = data.concat(this.state.data)
            // this.setState({
            //     data,
            //     loading:false
            // })
        } else {
            this.setState({
                loading: false,
            });
        }
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
                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>} color='red'>
                                2019-03-31
                            <List.Item
                                key={item.title}
                                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                extra={<img width={272} alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar}/>}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                            </Timeline.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="loading-container">
                                <Spin/>
                            </div>
                        )}
                    </List>
                </Timeline>
            </div>
        )
    }

}