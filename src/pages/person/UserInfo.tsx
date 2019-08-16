/**
 *  Created by pw on 2019-08-15 16:47.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { WXUserInfo } from '../../types/UserInofIF'
import './UserInfo.less'
import DEFAULT_AVATOR from '../../assets/images/person/no-user-avator.svg'

interface State {
  userInfo: WXUserInfo | undefined
}

export default class UserInfo extends Component<{}, State> {
  constructor() {
    super()
    this.state = {
      userInfo: undefined
    }
  }

  handleLogin = () => {
    Taro.getUserInfo().then(
      value => {
        this.setState({ userInfo: value.userInfo })
      },
      reason => {
        console.log(reason)
      }
    )
  }

  render() {
    const { userInfo } = this.state
    if (!userInfo) {
      return (
        <View className="user_info_wrapper">
          <img className="img" src={DEFAULT_AVATOR} />
          {process.env.TARO_ENV === 'weapp' && (
            <Button className="login" openType="getUserInfo" onClick={this.handleLogin}>
              登录
            </Button>
          )}
        </View>
      )
    }
    return (
      <View className="user_info_wrapper">
        <Image className="img" src={userInfo.avatarUrl} />
        <View className={'name'}>{userInfo.nickName}</View>
      </View>
    )
  }
}
