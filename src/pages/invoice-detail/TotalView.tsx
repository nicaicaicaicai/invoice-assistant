/**
 *  Created by pw on 2019-08-20 15:07.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { InvoiceItemIF } from './utils'
import TotalItemView from './TotalItemView'
import './PayerInfo.less'

export default class TotalView extends Component<InvoiceItemIF> {
  render() {
    const { label, value } = this.props
    if (!value) return
    return (
      <View className={'invoice-details'}>
        <View className="payerinfo-content mt-8">
          <View className="label">{label}</View>
          <View className="value">
            {value.map((line, index) => (
              <TotalItemView line={line} key={index} />
            ))}
          </View>
        </View>
      </View>
    )
  }
}
