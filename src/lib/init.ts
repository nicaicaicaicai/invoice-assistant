/**
 *  Created by pw on 2019-07-12 15:25.
 */
import Fetch from '../dataManager/FetchTaro'
import { URL_Login } from '../constants/UrlDefine'
import { UserLoginIF } from '../interfaces/UserInofIF'
import { updateUserInfo } from '../dataManager/AIStore'

export function login() {
  const phone = '18510916113'
  const pwd = '123456'
  const data = {
    fullPhone: '86-' + phone,
    password: pwd,
    deviceId: '5D52DA7F-1E54-4052-AFD5-1BA089CF0909',
    deviceType: 'MOBILE'
  }

  // Taro.request({
  //   url: URL_Login,
  //   method: 'POST',
  //   data,
  //   header: {
  //     'content-type': 'application/json'
  //   }
  // }).then(res => console.log(res))

  return Fetch.POST(URL_Login, data).then((res: UserLoginIF) => {
    // window.token = res.token
    return updateUserInfo({
      userId: res.userId,
      token: res.token
    })
  })
}
