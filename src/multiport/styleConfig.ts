/**
 *  Created by pw on 2019-08-16 16:31.
 */
// export const home_add_bottom = 148
export function getHomeAddBottom(): Number {
  switch (process.env.TARO_ENV) {
    case 'weapp':
      return 20
    case 'swan':
      return 20
    case 'alipay':
      return 60
    case 'h5':
      return 60
    default:
      return 20
  }
}
