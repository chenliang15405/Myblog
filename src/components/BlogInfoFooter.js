import React, {Component} from 'react'
import {Row, Col, Comment, Avatar, Input, Select, Form, Button, Tooltip, Icon, message} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

import ReplyArea from './ReplyArea'

import { createComment, getCommentsList, favoriteComment } from '../api/comment'
import { getLabelListByBlogId } from '../api/tag'

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
            submitting: false, //提交评论时，按钮是否loading
            commentValue : '', //评论的文本
            blogId: props.blogId,
            userId: '',
            commentLevel: 1,
            parentId: null,
            commentList:[],
            commentTotalNum: 0,
            page: 1,
            size: 6,
            likes: 0,
            dislikes: 0,
            action: null,
            showReplyInput: false,
            showReplyInputId: ''
        }
    }


    componentWillMount() {
       // 获取标签列表
      this.getLabelList()

      // 获取评论列表
      this.getCommentsList()
    }


    // 获取标签列表
    getLabelList = async () => {
      const { blogId } = this.state
      // console.log("blogid ",this.props.blogId)
      try {
          const response = await getLabelListByBlogId(blogId)
          if(response.code === 20000) {
            const data = response.data
            // console.log("blog_label:", data)
            this.setState({
                labels: data
            })
          }
      } catch (e) {
          console.log('getLabelList error', e)
      }
    }

    // 获取评论列表
    getCommentsList = async () => {
      try {
          const { blogId, page, size } = this.state
          const resp = await getCommentsList(blogId, page, size)
          if(resp.code === 20000) {
            this.setState({
              commentList: resp.data.rows,
              commentTotalNum: resp.data.total
            })
          }
        // console.log('comment list',resp)
      } catch (e) {
          console.log('getCommentsList error', e)
      }
    }

    //输入评论
    handleChange = (e) => {
        this.setState({
            commentValue: e.target.value
        })
    }

    //提交评论
    handleSubmit = async () => {
      const { blogId, commentValue, userId, commentLevel, parentId} = this.state
      const data = {
          blogId,
          content: commentValue,
          userId,
          parentId,
          commentLevel
      }
      try {
          const resp = await createComment(data)
          // console.log('handleSubmit resp', resp)
          if (resp.code === 20000) {
             this.setState({commentValue: ''})
             this.getCommentsList()
          }
      } catch (e) {
          console.log('handleSubmit comment error', e)
      }

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

    // 点赞
    like = async (id) => {
      // 点赞会将 action、id 、 ip 保存到redis里即保证了不重复点赞和动作，然后点赞次数+1到数据库，mq发送消息通知博主
      const resp = await favoriteComment(id, 'like')
      if(resp.code === 20000) {
        this.getCommentsList()
      } else if(resp.code === 20005) {
        message.success(resp.message);
      }
    }

    // 取消点赞
    dislike = async (id) => {
      const resp = await favoriteComment(id, 'dislike')
      if(resp.code === 20000) {
        this.getCommentsList()
      } else if(resp.code === 20005) {
        message.success(resp.message);
      }
    }

    reply = (id) => {
      this.setState({
        showReplyInput: !this.state.showReplyInput,
        showReplyInputId: id
      })
    }

    closeReplayInput = () => {
      this.setState({showReplyInput: false})
    }



    render() {
        const { submitting, commentValue, commentList, commentTotalNum, showReplyInput, showReplyInputId} = this.state;

        /*TODO react中最好不要直接在onClick={this.like} 这样绑定方法，否则会在加载时触发，最好使用箭头函数 onClick={()=>{this.like}}*/
        const actions = (id, likes, dislikes, action) => [
                <span>
                    <Tooltip title="666">
                      <Icon
                        type="like"
                        theme={action === 'like' ? 'filled' : 'outlined'}
                        onClick={() => this.like(id)}
                      />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                  </span>,
                  <span>
                    <Tooltip title="999">
                      <Icon
                        type="dislike"
                        theme={action === 'dislike' ? 'filled' : 'outlined'}
                        onClick={() => this.dislike(id)}
                      />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
                  </span>,
                  <span onClick={() => this.reply(id)}>{showReplyInput ? 'Cancel' : 'Reply to'}</span>,
          ]

        //评论列表展示
        const ExampleComment = ({ children, userName, avatar, content, actions,createDate, showReplyInput, showReplyInputId, id}) => (
          <Comment
            actions={actions}
            author={<a>{userName}</a>}
            avatar={(
              <Avatar
                src={avatar}
                alt="Han Solo"
              />
            )}
            content={<p>{content}</p>}
            datetime={
              createDate != null ? <Tooltip title={moment(createDate).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(createDate).fromNow()}</span>
                </Tooltip>
                : null
            }
          >
            {
              showReplyInput && showReplyInputId === id ?
                <ReplyArea commentId={id} refreshCommentList={() => this.getCommentsList()} closeShowInput={() => this.closeReplayInput()}/>
                : null
            }
            {children}
          </Comment>
        );



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
                      {/* TODO 评论中中集成表情*/}
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
                        <span>{commentTotalNum}</span>
                    </div>
                    <div className='comment-list'>
                        {
                            // TODO 在后端根据parentId 已经查询到  List<Comment> 这种集合
                            commentList.map((item,key) => {
                                return (
                                      <ExampleComment actions={actions(item.id, item.likeNum, item.dislikeNum, item.action)} key={key} userName={item.userName} avatar={item.avatar} content={item.content} createDate={item.createDate} showReplyInput={showReplyInput} showReplyInputId={showReplyInputId} id={item.id}>
                                          {
                                            item.childrens && item.childrens.length > 0 ? item.childrens.map((secondItem,secondKey) => {
                                              return (
                                                <ExampleComment actions={actions(secondItem.id, secondItem.likeNum, secondItem.dislikeNum, secondItem.action)} key={secondKey} userName={secondItem.userName} avatar={secondItem.avatar} content={secondItem.content} createDate={secondItem.createDate} showReplyInput={showReplyInput} showReplyInputId={showReplyInputId} id={secondItem.id}>
                                                  {
                                                    secondItem.childrens && secondItem.childrens.length > 0 ? secondItem.childrens.map((threeItem,threeKey) => {
                                                      return (
                                                        <ExampleComment actions={actions(threeItem.id, threeItem.likeNum, threeItem.dislikeNum, threeItem.action)} key={threeKey} userName={threeItem.userName} avatar={threeItem.avatar} content={threeItem.content} createDate={threeItem.createDate} showReplyInput={showReplyInput} showReplyInputId={showReplyInputId} id={threeItem.id}/>
                                                      )
                                                    })
                                                      : null
                                                  }
                                                </ExampleComment>
                                              )
                                            })
                                              : null
                                          }
                                      </ExampleComment>

                                )
                            })

                        }
                    </div>
                </Row>
            </Row>
        )
    }

}