import React, {Component} from 'react'
import {Row, Col,Comment, Avatar,Input,Select,Form,Button} from 'antd'
import {Link} from 'react-router-dom';
import axios from 'axios'
const Option = Select.Option;
const TextArea = Input.TextArea;


const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
    </Select>
);
const selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
        <Option value=".com">.com</Option>
        <Option value=".jp">.jp</Option>
        <Option value=".cn">.cn</Option>
        <Option value=".org">.org</Option>
    </Select>
);
//评论列表展示
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span>Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={(
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        )}
        content={<p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>}
    >
        {children}
    </Comment>
);

//评论
const Editor = ({
                    onChange, onSubmit, submitting, value,showUserInfo
                }) => (
    <div onClick={showUserInfo}>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Add Comment
            </Button>
        </Form.Item>
    </div>
);
/**
 * blog info footer
 */
export default class BlogInfoFooter extends Component {


   constructor(props) {
        super(props)
        this.state = {
            labels:[],
            submitting:false, //提交评论时，按钮是否loading
            commentValue : '' //评论的文本
        }
    }


    componentWillMount() {
       // 获取标签列表
      const blogId = this.props.blogId
      console.log("blogid ",this.props.blogId)
      const api = `http://localhost:9011/tag/label/blog/${blogId}`
      axios.get(api)
        .then(response => {
            if(response.data.code === 20000) {
              const data = response.data.data
              console.log("blog_label:",data)
                this.setState({
                    labels: data
                })
            }
        })
        .catch(err => {
            console.log("blog_label error: " ,err)
        })
    }





    //输入评论
    handleChange = (e) => {
        this.setState({
            commentValue: e.target.value
        })
    }

    //提交评论
    handleSubmit = () => {
        console.log('handleSubmit')
    }

    //触发用户信息
    showUserInfo = () => {
        //用于setAttribute的获取的容器，必须是html标签，不能是组件中标签，例如 Row
        let userInfoBox = this.refs.userInfo
        userInfoBox.setAttribute('style','display:block;')
    }

    //快速回复
    autoComment = (value) => {
        let {commentValue} = this.state
        this.setState({
            commentValue: commentValue + value
        })
    }

    render() {
        const {  submitting, commentValue } = this.state;
        return (
            <Row className='blog-info-footer'>
                <Row className='blog-footer-tags'>
                    <i className='iconfont'>&#xe676;</i>
                    标签: {
                        this.state.labels.map((item,key) => {
                            return (
                                <span key={key} className='tag-item'>
                                    {item.labelname}
                                </span>
                            )
                        })
                    }
                </Row>
                <Row className='copy-right'>
                    <div className={'copy-right-title'}>
                        文章版权及转载声明：
                    </div>
                    <div className='copy-right-statement'>
                        <p>作者:  <a href="http://www.baidu.com" style={{color:'red'}}>xxxx</a> ,{window.location.href},发布于 (2019-01-01)</p>
                        <p>文章转载或复制请注明出处<a href="http://www.baidu.com" style={{color:'red'}}> 唐宋个人博客</a></p>
                    </div>
                </Row>
                <Row className='share-great'>
                    <Col className='share-box'>
                        <div>
                            <span>分享: </span>
                        </div>
                        <div className='share-item'>
                            {/*TODO icon*/}
                            {/*<i></i>*/}
                            <a href="http://www.baidu.com">微博</a>
                        </div>
                        <div className='share-item'>
                            {/*<i></i>*/}
                            <a href="http://www.baidu.com">微信</a>
                        </div>
                        <div className='share-item'>
                            {/*<i></i>*/}
                            <a href="http://www.baidu.com">QQ</a>
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
                <div className='user-info-box' ref='userInfo'>
                    {/*TODO 可以实现一个扫码登录网站数据，通过生成一个随机的用户信息，然后用户扫码之后会生成一个随机的用户信息，获取到该Ip，就可以了。*/}
                    {/*点击评论，会显示窗户需要填写信息*/}
                    <div className='user-info'>
                        <span className='tips'>昵称:</span>
                        <Input placeholder="昵称(必填)" allowClear onChange={(e)=> console.log(e.target.value)} />
                    </div>
                    <div className='user-info'>
                        <span className='tips'>邮箱:</span>
                        <Input placeholder="邮箱(选填)" allowClear onChange={(e)=> console.log(e.target.value)} />
                    </div>
                    <div className='user-info url'>
                        <span className='tips'>网址:</span>
                        <Input addonBefore={selectBefore} allowClear addonAfter={selectAfter}  placeholder="网址(选填)"/>
                    </div>
                </div>
                <Row className='comment-post-box'>
                    <div className='comment-title'>
                        <i></i>
                        <h4>发表评论</h4>
                    </div>
                    <div className='fast-comment'>
                        <span style={{marginRight:'5px'}}>快捷回复:</span>
                        <a href='javascript:void(0);' title="文章不错,写的很好！" onClick={()=>this.autoComment('文章不错,写的很好！')}>
                            <i className='iconfont'>&#xe60c;</i>
                        </a>
                        <a  href="javascript:void(0);" title="emmmmm... 看不懂怎么破？"  onClick={()=>this.autoComment('emmmmm... 看不懂怎么破？')}>
                            <i className='iconfont'>&#xe627;</i>
                        </a>
                        <a  href="javascript:void(0);" title="赞、狂赞、超赞、不得不赞、史上最赞！"  onClick={()=>this.autoComment('赞、狂赞、超赞、不得不赞、史上最赞！')}>
                            <i className='iconfont'>&#xe657;</i>
                        </a>
                    </div>
                    <div>
                        <Comment
                            content={(
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={commentValue}
                                    showUserInfo = {this.showUserInfo}
                                />
                            )}
                        />
                    </div>
                </Row>
                <Row>
                    {/*
                        TODO 可以通过map循环来展示评论列表，通过循环父评论，然后判断是否有自评论，如果有，再循环子评论，只循环3层，然后展示所有的评论
                        父评论通过id关联blog，第二层自评论通过关联blog以及父评论的id,第三层也是关联blog以及父评论的id，只不过循环的不一样
                         或者说可以做成手风琴菜单
                    */}
                    <div className='comment-list-title'>
                        <span>评论列表：</span>
                        <i className='iconfont'>&#xe7f4;</i>
                        <span>99</span>
                    </div>
                    <div className='comment-list'>
                        <ExampleComment>
                            <ExampleComment>
                                <ExampleComment />
                                <ExampleComment />
                            </ExampleComment>
                        </ExampleComment>
                    </div>
                </Row>
            </Row>
        )
    }

}