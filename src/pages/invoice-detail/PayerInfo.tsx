/**
 *  Created by pw on 2019-07-26 13:28.
 */

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import SVG_RIGHT from '../../assets/images/invoice-detail/invoice-payerno-right.svg'
import SVG_WAR from '../../assets/images/invoice-detail/invoice-payerno-warning.svg'
import SVG_ERROR from '../../assets/images/invoice-detail/invoice-payerno-error-big.svg'
import './PayerInfo.less'
import { checkPayerInfo } from './utils'

export function PayerInfoName(props) {
  const { invoiceDetail, showTitleMessage, payerInfo, title, message, status } = props
  if (invoiceDetail.payer === '个人') {
    return (
      <View className={'payerinfo-wrapper'}>
        <View className="payerinfo-content">
          <View className="label">{title}</View>
          <View className="value">
            <View>{'个人'}</View>
            <img className="ml-5" src={SVG_RIGHT} />
          </View>
        </View>
      </View>
    )
  }
  const payerInfoArr = payerInfo
  const { checkPayerName, checkPayerNumber } = checkPayerInfo(invoiceDetail)
  const isNumberError = !checkPayerNumber || checkPayerNumber === 'no'
  let sameNameObj = isNumberError ? payerInfoArr.find(el => el.name === invoiceDetail.payer) : undefined

  const STATUS_MSG = {
    SUCCESS: '校验正确，和公司抬头结果一致',
    NO_VISIBLE: '校验失败，不属于可用的公司抬头'
  }
  const STATUS_IMG = { SUCCESS: SVG_RIGHT, NO_VISIBLE: SVG_WAR, NO_RESULT: SVG_ERROR }
  let ischeckName = checkPayerNumber === 'no',
    payeeTip = '',
    payeeImg

  if (ischeckName) {
    payeeTip = '开票信息不符'
    payeeImg = SVG_WAR
  } else {
    payeeTip = checkPayerName === false ? STATUS_MSG['NO_VISIBLE'] : STATUS_MSG[status] || message
    payeeImg = checkPayerName === false ? STATUS_IMG['NO_RESULT'] : STATUS_IMG[status]
  }
  return (
    <View className={'payerinfo-wrapper'}>
      <View className="payerinfo-content">
        <View className="label">{title}</View>
        <View className="value">
          <View className={checkPayerName ? '' : 'color-red-6 flex'} onClick={() => showTitleMessage(payeeTip)}>
            <span>{invoiceDetail.payer}</span>
            <img className="ml-5" src={payeeImg} />
          </View>
          {checkPayerName && isNumberError && (
            <View className="warning-text">
              <View className="mr-5">{'对应税号'}</View>
              {sameNameObj && sameNameObj.payerNo}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export function PayerInfoNumber(props) {
  const { invoiceDetail, payerInfo, showMessage, title, message, status } = props
  if (!invoiceDetail) {
    return null
  }
  let payertaxno = invoiceDetail && invoiceDetail.payertaxno && invoiceDetail.payertaxno.toUpperCase()

  if (invoiceDetail.payer === '个人') {
    return (
      <View className={'payerinfo-wrapper'}>
        <View className="payerinfo-content">
          <View className="label">{title}</View>
          {payertaxno && (
            <View className="value">
              <span>{payertaxno}</span>
              <img className="ml-5" src={SVG_RIGHT} />
            </View>
          )}
        </View>
      </View>
    )
  }
  const payerInfoArr = payerInfo
  const { checkPayerName, checkPayerNumber } = checkPayerInfo(invoiceDetail)
  if (checkPayerNumber === 'noCheck') {
    return <span>{payertaxno || '无法获取'}</span>
  }

  const STATUS_MSG = {
    SUCCESS: '校验正确，和公司纳税人识别号一致',
    NO_VISIBLE: '校验失败，不属于可用的纳税人识别号'
  }
  const STATUS_IMG = { SUCCESS: SVG_RIGHT, NO_VISIBLE: SVG_WAR, NO_RESULT: SVG_ERROR }

  let ischeckName = checkPayerNumber === 'no',
    payeeTip = '',
    payeeImg
  if (ischeckName) {
    payeeTip = '无法获取购买方纳税人识别号'
    payeeImg = SVG_WAR
  } else {
    payeeTip = checkPayerName === false ? STATUS_MSG['NO_VISIBLE'] : STATUS_MSG[status] || message
    payeeImg = checkPayerName === false ? STATUS_IMG['NO_RESULT'] : STATUS_IMG[status]
  }

  const isNameError = !checkPayerName
  let sameNumberObj
  if (isNameError) {
    sameNumberObj = payerInfoArr.find(el => el.payerNo === payertaxno)
  }

  return (
    <View className={'payerinfo-wrapper'}>
      <View className="payerinfo-content payerInfo-number">
        <View className="label">{title}</View>
        <View className="value value-number">
          <View onClick={() => showMessage(payeeTip)} className={!!checkPayerNumber ? 'flex' : 'color-red'}>
            {checkPayerNumber === 'no' ? '无法获取' : payertaxno}
            <img className="ml-5" src={payeeImg} />
          </View>
          {checkPayerNumber && checkPayerNumber !== 'no' && isNameError && (
            <View className="warning-text">
              <View className="mr-5">{'对应购买方'}</View>
              {sameNumberObj && sameNumberObj.name}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
