/**
 *  Created by pw on 2019-07-15 12:01.
 */
import Taro from '@tarojs/taro'
import { UserInfo } from '../types/UserInofIF'

export function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => '')
}

export function updateUserInfo(userInfo: UserInfo) {
  return updateStorage('userInfo', userInfo)
}

export function updateStorage(key: string, data: any) {
  return Taro.setStorage({ key, data })
}

export function getToken() {
  return getStorage('userInfo').then(value => {
    // @ts-ignore
    return value.token
  })
}
