/**
 *  Created by pw on 2019-08-20 15:04.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { InvoiceItemIF } from './utils'
import './PayerInfo.less'
import InvoiceDetailItem from './InvoiceDetailItem'

export default class InvoiceDetail extends Component<InvoiceItemIF> {
  render() {
    const { label, value, onItemClick, sourcePage } = this.props
    if (!value) return null
    return (
      <View className={'invoice-details'}>
        <View className="payerinfo-content">
          <View className="label">{label}</View>
          <View className="value">
            {value.map((line, index) => (
              <InvoiceDetailItem
                line={line}
                index={index}
                key={index}
                onItemClick={onItemClick}
                sourcePage={sourcePage}
              />
            ))}
          </View>
        </View>
      </View>
    )
  }
}
