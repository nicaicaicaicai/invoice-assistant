/**
 *  Created by pw on 2019-07-08 13:50.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.less'
import { HomeModeIF } from '../../interfaces/HomeIF'
import { HomeStore } from '../../store'
import HomeActionSheet from './HomeActionSheet'

interface Props {
  homeStore?: typeof HomeStore
}

interface State {
  isOpened: boolean
}

@inject('homeStore')
@observer
export default class Home extends Component<Props, State> {
  state = {
    isOpened: false
  }

  handleClickItem = (home: HomeModeIF) => {
    console.log(home)
  }

  handleActionSheet = () => {
    this.setState({ isOpened: true })
  }

  handleActionClick = (type: string) => {
    console.log(type)
    this.setState({ isOpened: false })
  }

  render() {
    if (!this.props.homeStore) {
      return null
    }
    return (
      <View className="home_wrapper">
        <AtList>
          {this.props.homeStore.homeList.map((home: HomeModeIF, index: number) => {
            return (
              <AtListItem
                key={home.id || index}
                className="home_list"
                title={home.title}
                note={home.desc}
                extraText={home.amount}
                thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
                onClick={() => this.handleClickItem(home)}
              />
            )
          })}
        </AtList>
        <View onClick={this.handleActionSheet}>
          <AtAvatar className="avatar" circle text="ADD" />
        </View>
        <HomeActionSheet isOpened={this.state.isOpened} onAction={type => this.handleActionClick(type)} />
      </View>
    )
  }
}
