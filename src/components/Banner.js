import React,{Component} from 'react'

import { Carousel } from 'antd';
import 'antd/dist/antd.css'

import img1 from '../asserts/images/one.jpeg'
import img2 from '../asserts/images/two.jpeg'
import img3 from '../asserts/images/three.jpeg'
import img4 from '../asserts/images/four.jpeg'
import img5 from '../asserts/images/five.jpeg'


/**
 * 轮播图，TODO 后面可以将轮播图的图片和文字都是通过后台管理设置
 */
export default class Banner extends Component {


    render(){
        return  (
            <Carousel effect={"fade"} autoplay className='banner'>
                <div className='bannerList'>
                    <img src={img1} alt=""/>
                    <div className='banner-description'>
                        <h3>书籍备而不读如废纸</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={img2} alt=""/>
                    <div className='banner-description'>
                        <h3>我这个人走的很慢，但我从不后退</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={img3} alt=""/>
                    <div className='banner-description'>
                        <h3>索取，只有在一个场合才能越多越好，那就是读书</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={img4} alt=""/>
                    <div className='banner-description'>
                        <h3>先相信自己，然后别人才会相信你</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={img5} alt=""/>
                    <div className='banner-description'>
                        <h3>战斗吧！瓦斯塔亚，断剑重铸之日，骑士归来之时</h3>
                    </div>
                </div>

            </Carousel>

        )

    }


}