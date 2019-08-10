import axios from 'axios'
import { message } from 'antd'


//创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/api',
  timeout: 200000, // 请求超时时间
  withCredentials: true // 选项表明了是否是跨域请求
})

// 配置请求拦截器
service.interceptors.request.use(config => {
  // message.loading('加载中',1)              // loading组件，显示文字加载中，自动关闭延时1s
  console.log('request go');
  return config;
}, err => {
  console.log('请求失败')
  return Promise.reject(err)
})

//拦截响应
service.interceptors.response.use(config => {
  console.log('response get')
  return config;
}, err => {
  console.log('响应失败')
  return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const resp = response.data
    if (resp.code === 20000 || resp.code === "20000") {
      // console.log("interceptors: response",resp)
      // message.info(resp.message, 2);
      return resp
    } else if(resp.code === 20005 || resp.code === '20005'){
      return resp
    } else {
      // 可以在这里直接返回response.data 方便后面处理
      return Promise.reject('error')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service