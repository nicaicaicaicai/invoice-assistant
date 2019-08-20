/**
 *  Created by pw on 2019-08-20 15:00.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { InvoiceItemIF } from './utils'
import './PayerInfo.less'

export default class InvoiceItem extends Component<InvoiceItemIF> {
  render(): any {
    const { label, value, isShow = true } = this.props
    if (!isShow) return null

    return (
      <View className={'payerinfo-wrapper'}>
        <View className="payerinfo-content">
          <View className="label">{label}</View>
          <View className="value"> {value}</View>
        </View>
      </View>
    )
  }
}
