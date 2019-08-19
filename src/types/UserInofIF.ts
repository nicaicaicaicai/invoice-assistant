/**
 *  Created by pw on 2019-07-15 12:05.
 */

export interface UserLoginIF {
  token: string
  type: string
  message?: any
  userId: string
  error: boolean
}

export interface UserInfo {
  token: string
  userId: string
  /**
   * 用户昵称
   */
  nickName: string
  /**
   * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
   */
  avatarUrl: string
  /**
   * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
   */
  gender: 0 | 1 | 2
  /**
   * 用户所在城市
   */
  city: string
  /**
   * 用户所在省份
   */
  province: string
  /**
   * 用户所在国家
   */
  country: string
  /**
   * 用户的语言，简体中文为zh_CN
   */
  language: string
}
