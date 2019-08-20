/**
 *  Created by pw on 2019-08-20 15:05.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isMoneyObject } from './utils'
import Money from '../../components/Money'
import classnames from 'classnames'
import './PayerInfo.less'

export default class InvoiceDetailItem extends Component<any> {
  render() {
    const { line, index, onItemClick, sourcePage } = this.props
    const re = new RegExp(`^(-?([1-9]\\d*)|0)(\\.\\d*)?$`)
    const taxRate = line.taxRate ? (Number(line.taxRate) >= 0 ? line.taxRate + '%' : line.taxRate) : ''
    const isMoney = isMoneyObject(line.tax) ? true : re.test(line.tax)
    let cls = classnames('projectDetail', { 'mt-8': index !== 0 })
    let checkedColor = line.checked || !line.isDisable ? '#3a3f3f' : '#8c8c8c'
    return (
      <View className={cls} key={index} onClick={_ => sourcePage === 'checkInvoice' && onItemClick(line)}>
        <View className="name" style={{ color: checkedColor }}>
          {line.checked && <View className="dot" />}
          <View className="title">{line.name}</View>
          <View className="count">{`×${line.totalCount ? line.totalCount : 1}`}</View>
        </View>
        <View className="item">
          <span className="label-item">{'金额'}</span>
          <Money currencySize={14} valueSize={14} color={checkedColor} value={line.amount || ''} />
        </View>
        <View className="item">
          <span className="label-item">{'税率'}</span>
          <span className="value-item" style={{ color: checkedColor }}>
            {taxRate}
          </span>
        </View>
        <View className="item">
          <span className="label-item">{'税额'}</span>
          {isMoney ? <Money currencySize={14} valueSize={14} color={checkedColor} value={line.tax || ''} /> : line.tax}
        </View>
        <View className="item-line" />
      </View>
    )
  }
}
