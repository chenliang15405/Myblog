import fetch from '../axios/request'


const getBlogArchiveList = (page, pageSize) => {
    return fetch({
        url: `/article/article/archive/${page}/${pageSize}`,
        method: 'get'
    })
}

export {
  getBlogArchiveList
}