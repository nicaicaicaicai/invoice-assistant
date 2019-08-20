/**
 *  Created by pw on 2019-08-20 15:09.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Money from '../../components/Money'
import './PayerInfo.less'

export default class TotalItemView extends Component<any> {
  render() {
    const { line } = this.props
    if (!line) {
      return null
    }
    return (
      <View className="projectDetail">
        <View className="item">
          <span className="label-item">{line.label}</span>
          <Money currencySize={14} valueSize={14} color={'#3a3f3f'} value={line.value} />
        </View>
      </View>
    )
  }
}
