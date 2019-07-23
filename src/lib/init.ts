/**
 *  Created by pw on 2019-07-12 15:25.
 */
import Fetch from '../dataManager/FetchTaro'
import { URL_Login } from '../constants/UrlDefine'
import { UserLoginIF } from '../interfaces/UserInofIF'
import { updateUserInfo } from '../dataManager/AIStore'
import { PHONE, PWD } from '../constants/DevConfig'

export function login() {
  const data = {
    fullPhone: '86-' + PHONE,
    password: PWD,
    deviceId: '5D52DA7F-1E54-4052-AFD5-1BA089CF0909',
    deviceType: 'MOBILE'
  }

  return Fetch.POST(URL_Login, data).then((res: UserLoginIF) => {
    // window.token = res.token
    return updateUserInfo({
      userId: res.userId,
      token: res.token
    })
  })
}
