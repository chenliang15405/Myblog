import fetch from '../axios/request'


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

export {
    getBlogList,
    getBlogLabels
}