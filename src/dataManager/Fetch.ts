/**
 *  Created by pw on 2019-07-11 20:49.
 */

import axios from 'axios'
// import store from '../store'

// 请求列表
const requestList: string[] = []
// 取消列表
const CancelToken = axios.CancelToken
let sources = {}

// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;application/x-www-form-urlencoded'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.interceptors.request.use(
  config => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data)

    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel
    })

    if (requestList.includes(request)) {
      sources[request]('取消重复请求')
    } else {
      requestList.push(request)
      // store.dispatch('changeGlobalState', { loading: true })
    }

    const token = window.token
    if (token) {
      config.headers['ekb-access-token'] = token
    }

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
    requestList.splice(requestList.findIndex(item => item === request), 1)
    if (requestList.length === 0) {
      // store.dispatch('changeGlobalState', { loading: false })
    }
    return response
  },
  function(error) {
    if (axios.isCancel(error)) {
      requestList.length = 0
      // store.dispatch('changeGlobalState', { loading: false })
      throw new axios.Cancel('cancel request')
    } else {
      // window.ELEMENT.Message.error('网络请求失败', 1000)
    }
    return Promise.reject(error)
  }
)

const Fetch = function(_url, params, config, method) {
  return new Promise((resolve, reject) => {
    const { url } = buildOptions(_url)
    axios[method](url, params, Object.assign({}, config))
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          if (err.Cancel) {
            console.log(err)
          } else {
            reject(err)
          }
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

function buildOptions(url: string) {
  url += '?corpId=ciI8S37EDE0000'
  return { url }
}

export const POST = (Fetch.POST = function(url, params, config = {}) {
  return Fetch(url, params, config, 'post')
})

export const GET = (Fetch.GET = function(url, params?, config = {}) {
  return Fetch(url, params, config, 'get')
})

export { sources }

export default Fetch
