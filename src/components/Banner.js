import React,{Component} from 'react'

import { Carousel } from 'antd';
// import 'antd/dist/antd.css'

// import img1 from '../asserts/images/one.jpeg'
// import img2 from '../asserts/images/two.jpeg'
// import img3 from '../asserts/images/three.jpeg'
// import img4 from '../asserts/images/four.jpeg'
// import img5 from '../asserts/images/five.jpeg'


/**
 * 轮播图，TODO 后面可以将轮播图的图片和文字都是通过后台管理设置
 */
export default class Banner extends Component {

    render(){
        return  (
            <Carousel effect={"fade"} autoplay className='banner'>
                <div className='bannerList'>
                    <img src={'https://caf-weikefu-qa.oss-cn-hangzhou.aliyuncs.com/deploy/test/one.jpeg'} alt=""/>
                    <div className='banner-description'>
                        <h3>书籍备而不读如废纸</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={'https://caf-weikefu-qa.oss-cn-hangzhou.aliyuncs.com/deploy/test/two.jpeg'} alt=""/>
                    <div className='banner-description'>
                        <h3>牛羊才成群结队，猛兽总是独行</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={'https://caf-weikefu-qa.oss-cn-hangzhou.aliyuncs.com/deploy/test/three.jpeg'} alt=""/>
                    <div className='banner-description'>
                        <h3>迷茫，只不过是你的才华配不上你的梦想</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={'https://caf-weikefu-qa.oss-cn-hangzhou.aliyuncs.com/deploy/test/four.jpeg'} alt=""/>
                    <div className='banner-description'>
                        <h3>惟沉默是最高的轻蔑  ——鲁迅</h3>
                    </div>
                </div>
                <div className='bannerList'>
                    <img src={'https://caf-weikefu-qa.oss-cn-hangzhou.aliyuncs.com/deploy/test/five.jpeg'} alt=""/>
                    <div className='banner-description'>
                        <h3>一个人如果没有梦想，跟无忧无虑有什么区别呢？</h3>
                    </div>
                </div>
            </Carousel>
        )
    }


}