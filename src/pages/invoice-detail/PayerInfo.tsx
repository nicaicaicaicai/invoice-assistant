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
      <div className={'payerinfo-wrapper'}>
        <div className="payerinfo-content">
          <div className="label">{title}</div>
          <div className="value">
            <span>{'个人'}</span>
            <img className="ml-5" src={SVG_RIGHT} />
          </div>
        </div>
      </div>
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
    <div className={'payerinfo-wrapper'}>
      <div className="payerinfo-content">
        <div className="label">{title}</div>
        <div className="value">
          <div className={checkPayerName ? '' : 'color-red-6 flex'} onClick={() => showTitleMessage(payeeTip)}>
            <span>{invoiceDetail.payer}</span>
            <img className="ml-5" src={payeeImg} />
          </div>
          {checkPayerName && isNumberError && (
            <div className="warning-text">
              <View className="mr-5">{'对应税号'}</View>
              {sameNameObj && sameNameObj.payerNo}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function PayerInfoNumber(props) {
  const { invoiceDetail, payerInfo, showMessage, title, message, status } = props
  let payertaxno = invoiceDetail.payertaxno && invoiceDetail.payertaxno.toUpperCase()
  if (invoiceDetail.payer === '个人') {
    return (
      <div className={'payerinfo-wrapper'}>
        <div className="payerinfo-content">
          <div className="label">{title}</div>
          {payertaxno && (
            <div className="value">
              <span>{payertaxno}</span>
              <img className="ml-5" src={SVG_RIGHT} />
            </div>
          )}
        </div>
      </div>
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
    <div className={'payerinfo-wrapper'}>
      <div className="payerinfo-content payerInfo-number">
        <div className="label">{title}</div>
        <div className="value value-number">
          <div onClick={() => showMessage(payeeTip)} className={!!checkPayerNumber ? 'flex' : 'color-red'}>
            {checkPayerNumber === 'no' ? '无法获取' : payertaxno}
            <img className="ml-5" src={payeeImg} />
          </div>
          {checkPayerNumber && checkPayerNumber !== 'no' && isNameError && (
            <div className="warning-text">
              <View className="mr-5">{'对应购买方'}</View>
              {sameNumberObj && sameNumberObj.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
