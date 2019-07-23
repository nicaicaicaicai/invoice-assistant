/**
 *  Created by pw on 2019-07-22 17:45.
 */
import Taro from '@tarojs/taro'
import { getToken } from './AIStore'
import { CORPID } from '../constants/DevConfig'

const Fetch = function(_url, params, config, method) {
  return new Promise((resolve, reject) => {
    const { url } = buildOptions(_url)

    getToken().then(token => {
      Taro.request({
        method,
        url,
        data: { ...params, ...config },
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

function buildOptions(url: string) {
  url += `?corpId=${CORPID}`
  return { url }
}

export const POST = (Fetch.POST = function(url, params, config = {}) {
  return Fetch(url, params, config, 'post')
})

export const GET = (Fetch.GET = function(url, params?, config = {}) {
  return Fetch(url, params, config, 'get')
})

export default Fetch
