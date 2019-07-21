import fetch from '../axios/request'

/**
 * 首页 api
 */

const getBlogList = (page, pageSize, data) => {
    return fetch({
        url: `/article/article/search/${page}/${pageSize}`,
        method: 'post',
        data
    })
}

const getBlogLabels = () => {
    return fetch({
        url: `/category/category/`,
        method: 'get'
    })
}

const getBloggerInfo = () => {
    return fetch({
        url: `/user/user/admin/`,
        method: 'get'
    })
}

export {
    getBlogList,
    getBlogLabels,
    getBloggerInfo
}