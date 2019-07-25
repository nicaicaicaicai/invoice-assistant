/**
 *  Created by pw on 2019-07-22 17:45.
 */
import Taro from '@tarojs/taro'
import { getToken } from './AIStore'
import { CORPID } from '../constants/DevConfig'

const Fetch = function(_url, params, config, method) {
  return new Promise((resolve, reject) => {
    const { url, body } = buildOptions(_url, params, config)

    getToken().then(token => {
      Taro.request({
        method,
        url,
        data: { ...body, ...config },
        header: {
          'content-type': 'application/json',
          cookie: `ekb-access-token=${token}; `
        }
      })
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
  })
}

function buildOptions(url: string, body = {}, qs = {}) {
  url += `?corpId=${CORPID}`
  let path = url
  path = path.replace(/\$([a-zA-Z0-9_]+)|\[([a-zA-Z0-9_]+)]/g, (_, id, ids) => {
    const arg = id || ids
    const value = (body && body[arg]) || (qs && qs[arg])
    body && delete body[arg]
    qs && delete qs[arg]
    return id ? '$' + value : '[' + value + ']'
  })

  return { url: path, body }
}

export const POST = (Fetch.POST = function(url, params, config = {}) {
  return Fetch(url, params, config, 'POST')
})

export const GET = (Fetch.GET = function(url, params?, config = {}) {
  return Fetch(url, params, config, 'GET')
})

export const PUT = (Fetch.PUT = function(url, params, config = {}) {
  return Fetch(url, params, config, 'PUT')
})

export const DELETE = (Fetch.DELETE = function(url, params?, config?) {
  return Fetch(url, params, config, 'DELETE')
})

export default Fetch
