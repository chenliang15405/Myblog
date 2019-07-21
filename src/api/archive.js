import fetch from '../axios/request'
/**
 * 文章api
 */

const getBlogArchiveList = (page, pageSize) => {
    return fetch({
        url: `/article/article/archive/${page}/${pageSize}`,
        method: 'get'
    })
}

export {
  getBlogArchiveList
}