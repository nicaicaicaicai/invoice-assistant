/**
 *  Created by pw on 2019-07-08 13:50.
 */

import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.less'
import { HomeModeIF } from '../../interfaces/HomeIF'
import { HomeStore } from '../../store'

interface Props {
  homeStore?: typeof HomeStore
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {
  handleClickItem = (home: HomeModeIF) => {
    console.log(home)
  }

  render() {
    if (!this.props.homeStore) {
      return null
    }
    return (
      <AtList>
        {this.props.homeStore.homeList.map((home: HomeModeIF, index: number) => {
          return (
            <AtListItem
              key={home.id || index}
              title={home.title}
              note={home.desc}
              extraText={home.amount}
              thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
              onClick={() => this.handleClickItem(home)}
            />
          )
        })}
      </AtList>
    )
  }
}
