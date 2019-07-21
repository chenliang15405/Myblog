import fetch from '../axios/request'

/**
 * 标签 api
 */

const getLabelListByBlogId = (blogId) => {
  return fetch({
      url: `tag/tag/label/blog/${blogId}`,
      method: 'get'
  })
}


export {
    getLabelListByBlogId
}