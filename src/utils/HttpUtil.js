import axios from 'axios'


/**
 * http util 基于promise
 */
class HttpUtil {


    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
        })
    }

    
    static getWithParams(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    static post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}
export default HttpUtil