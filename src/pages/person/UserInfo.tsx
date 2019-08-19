/**
 *  Created by pw on 2019-08-15 16:47.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { UserInfo as UserInfoIF } from '../../types/UserInofIF'
import './UserInfo.less'
import DEFAULT_AVATOR from '../../assets/images/person/no-user-avator.svg'
import { MineStore } from '../../store/mine'
import { inject, observer } from '@tarojs/mobx'

interface State {
  userInfo: UserInfoIF | undefined
}

interface Props {
  mineStore: MineStore
}

@inject('mineStore')
@observer
export default class UserInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      userInfo: undefined
    }
  }

  componentDidMount() {
    this.props.mineStore.getUserInfo().then(userInfo => {
      this.setState({ userInfo })
    })
  }

  handleLogin = () => {
    Taro.getUserInfo().then(
      value => {
        this.setState({ userInfo: value.userInfo as UserInfoIF })
        return this.props.mineStore.updateUserInfo(value.userInfo as UserInfoIF)
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
