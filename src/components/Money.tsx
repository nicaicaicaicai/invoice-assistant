/**
 *  Created by pw on 2019-07-26 14:15.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { MoneyIF } from '../interfaces/InvoiceIF'
import { getAmount, thousandBitSeparator } from '../lib/MoneyUtil'
import './Money.less'

interface Props {
  currencySize?: number
  valueSize?: number
  color?: string
  value: MoneyIF
  isNegative?: boolean
  isShowThousandsSeparator?: boolean
  withoutStyle?: boolean
  isShowSymbol?: boolean
  fontWeight?: number
  style?: any
  className?: string
}

export default class Money extends Component<Props> {
  render() {
    let {
      value,
      isNegative,
      color,
      isShowThousandsSeparator,
      currencySize,
      withoutStyle,
      isShowSymbol,
      valueSize,
      fontWeight,
      className,
      style
    } = this.props

    let m = Number(getAmount(value))
    if (m < 0) {
      m = m * -1
      isNegative = true
      color = 'rgb(245, 34, 45)'
    }
    let moneyValue = Number(m).toFixed(Number(value && value.standardScale))

    if (isShowThousandsSeparator) {
      moneyValue = thousandBitSeparator(moneyValue)
    }

    const sy = (value && value.standardSymbol) || '￥'
    let currencySizeStr = ''
    if (Number(currencySize) > 0) {
      currencySizeStr = currencySize + 'px'
    }

    const _className = className ? className : 'money-wrap'

    return (
      <View className={_className} style={{ color, ...style }}>
        <span style={withoutStyle ? void 0 : { fontSize: currencySizeStr, color: color }} className="currency">
          {isNegative && '-'}
          {isShowSymbol ? sy : ''}
          &nbsp;
        </span>
        <span
          style={
            withoutStyle
              ? void 0
              : {
                  fontSize: valueSize,
                  fontWeight: fontWeight,
                  color: color
                }
          }
          className="value"
        >
          {moneyValue}
        </span>
      </View>
    )
  }
}
