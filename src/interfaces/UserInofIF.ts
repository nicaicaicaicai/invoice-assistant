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
}
