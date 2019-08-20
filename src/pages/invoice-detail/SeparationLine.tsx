/**
 *  Created by pw on 2019-08-20 14:56.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './PayerInfo.less'

export default class SeparationLine extends Component<any> {
  render() {
    const { isShow, sourcePage } = this.props
    if (!isShow) return null
    let str = sourcePage === 'checkInvoice' ? '特殊标识的为已绑定费用或批次的明细' : '以下特殊标识的为绑定该费用的明细'
    return (
      <View className={'separation-line'}>
        <View className="separation" />
        <View className="info">{str}</View>
        <View className="separation" />
      </View>
    )
  }
}
