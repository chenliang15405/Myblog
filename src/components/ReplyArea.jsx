import React, { Component } from 'react'
import {Input, Button, message} from 'antd'

import { replyComment } from '../api/comment'

const TextArea = Input.TextArea;


export default class ReplyArea extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      commentId: props.commentId,
      replyContent: '',
      loading: false
    }
  }

  onChange = (e) => {
    this.setState({
      replyContent: e.target.value
    })
  }

  submitReply = async () => {
    const { commentId, replyContent } = this.state
    const data = {
      commentId: commentId,
      replyContent: replyContent
    }
    this.setState({loading: true})
    const resp = await replyComment(data)
    if(resp.code === 20000) {
      this.props.refreshCommentList()
    } else {
      message.error("系统异常")
    }
    this.setState({loading: false})
    this.closeShow()
  }

  closeShow = () => {
    // 调用父组件的方法
    this.props.closeShowInput()
  }


  render() {
    const { replyContent, loading } = this.state

    return (
        <div className='reply-area'>
          <TextArea value={replyContent} placeholder={`回复...`} onChange={this.onChange} rows={2} onPressEnter={this.submitReply}/>
          <Button onClick={this.submitReply} className='reply-submit' size='small' ghost={true} loading={loading} type="primary">Reply</Button>
        </div>
    )
  }
  
}