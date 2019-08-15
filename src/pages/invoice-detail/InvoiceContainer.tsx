/**
 *  Created by pw on 2019-07-26 14:10.
 */

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './PayerInfo.less'
import { isMoneyObject } from './utils'
import Money from '../../components/Money'
import classnames from 'classnames'

export function InvoiceItem(props) {
  const { label, value, isShow = true } = props
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

export function SeparationLine(props) {
  const { isShow, sourcePage } = props
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

export function InvoiceMoney(props) {
  const { value, label } = props
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

export function InvoiceDetail(props) {
  const { label, value, onItemClick, sourcePage } = props
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

export function InvoiceDetailItem(props) {
  const { line, index, onItemClick, sourcePage } = props
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

export function TotalView(props) {
  const { label, value } = props
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

function TotalItemView(props) {
  const { line } = props
  return (
    <View className="projectDetail">
      <View className="item">
        <span className="label-item">{line.label}</span>
        <Money currencySize={14} valueSize={14} color={'#3a3f3f'} value={line.value} />
      </View>
    </View>
  )
}
