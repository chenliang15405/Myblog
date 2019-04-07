import React,{Component} from 'react'
import {Card} from 'antd'
import axios from 'axios'

/**
 * 推荐card   TODO 后面可以用来推荐技术文章或者抖音热门视频或者音乐
 */
export default class TodayPoetry extends  Component {

    constructor(props){
        super(props)
        this.state={
            content:[],
            origin:{},
            matchTags:[],
            popular:null
        }
    }

    componentDidMount(){
        this.getArtList();

    }


    getArtList = () => {
        axios.create({
            baseURL: "https://v2.jinrishici.com/one.json",
            withCredentials: true
        }).get("").then(result => {
            this.setState({
                content: result.data.data.content,
                origin:result.data.data.origin,
                matchTags: result.data.data.matchTags,
                popular: result.data.data.popularity
            })
        })
    }


    render(){
        var arr=[]
        for (let i in this.state.origin.content){
            arr.push(this.state.origin.content[i])
        }
        arr = arr[0];

        return <Card className='todayPoetry'>
            <h2>今天推荐诗词</h2>
            <div className='poetry-content'>
                <p className='poetry-title'>{this.state.origin.title}</p>
                <p className='poetry-author'>{this.state.origin.author}•{this.state.origin.dynasty}</p>

                <p className='poetry-word'>{arr}</p>

                <p>推荐诗词句:</p>
                <p className='poetry-sentence'>{this.state.content}</p>
                <span className='poetry-key'>推荐关键词:
                {
                    this.state.matchTags.map((val,key)=>{
                        return <span key={key}>{val}</span>
                    })
                }
                </span>
                <p>流行度评价：{this.state.popular}</p>
            </div>



        </Card>
    }



}
