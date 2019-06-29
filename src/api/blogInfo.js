import fetch from '../axios/request'

export const getBlogContent = (id) => {
  return fetch({
      url: `/article/article/${id}`,
      method: 'get'
  })
}


/*
* // 1根据订单id获取订单信息
export function getOrderById( data) {
  return fetch({
   // baseURL:"http://172.19.5.34:9531",
   // url: '/getOrderById',
    url: '/apc/getOrderById',
    method: 'post',
    data,
  })
}
// 2.获取商户支持的支付方式
export function queryByOwenerIdAndOwnerType( params) {
  return fetch({
    url: '/api/productSubscribe/queryByOwenerIdAndOwnerType',
    method: 'get',
    params,
  })
*
*/