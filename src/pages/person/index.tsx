/**
 *  Created by pw on 2019-07-24 14:49.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

export default class Person extends Component {
  handleListItemClick = url => {
    return Taro.navigateTo({
      url
    })
  }

  render() {
    return (
      <View>
        <AtList>
          <AtListItem
            title="企业开票信息"
            arrow="right"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            onClick={() => this.handleListItemClick('/pages/person/CompanyInvoceList')}
          />
          <AtListItem
            title="添加类型配置"
            arrow="right"
            thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
            onClick={() => this.handleListItemClick('/pages/person/AddButtonConfig')}
          />
          <AtListItem
            title="关于"
            arrow="right"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            onClick={() => this.handleListItemClick('/pages/person/About')}
          />
        </AtList>
      </View>
    )
  }
}
