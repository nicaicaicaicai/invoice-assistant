/**
 *  Created by pw on 2019-07-12 15:25.
 */

import Fetch from '../dataManager/Fetch'
import { URL_Login } from '../constants/UrlDefine'
import { UserLoginIF } from '../interfaces/UserInofIF'
import { updateUserInfo } from '../dataManager/AIStore'

export function login() {
  const phone = '18510916113'
  const pwd = '123456'
  let param = {
    fullPhone: '86-' + phone,
    password: pwd,
    deviceId: '5D52DA7F-1E54-4052-AFD5-1BA089CF0909',
    deviceType: 'MOBILE'
  }

  return Fetch.POST(URL_Login, param).then((res: UserLoginIF) => {
    window.token = res.token
    return updateUserInfo({ userId: res.userId, token: res.token })
  })
}
