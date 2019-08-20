/**
 *  Created by pw on 2019-08-20 14:58.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './PayerInfo.less'
import { isMoneyObject } from './utils'
import Money from '../../components/Money'
import { InvoiceItemIF } from './utils'

export default class InvoiceMoney extends Component<InvoiceItemIF> {
  render() {
    const { value, label } = this.props
    const isMoney = isMoneyObject(value) ? true : Number(value)
    return (
      <View className={'payerinfo-wrapper'}>
        <View className="payerinfo-content">
          <View className="label">{label}</View>
          {isMoney ? (
            <Money currencySize={14} valueSize={14} color={'#262626'} value={value || 0} />
          ) : (
            <View className="value">{value}</View>
          )}
        </View>
      </View>
    )
  }
}
