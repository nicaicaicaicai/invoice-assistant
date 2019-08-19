/**
 *  Created by pw on 2019-08-19 15:17.
 */
import Taro from '@tarojs/taro'
import { qrInvoice } from '../dataManager/Actions'

export function scanInvoice() {
  return Taro.scanCode({
    onlyFromCamera: true,
    scanType: ['qrCode']
  }).then(res => {
    Taro.showLoading({
      title: '识别中...',
      mask: true
    })
    const code = res.result
    return qrInvoice({
      qrcode: code,
      captcha: '',
      time: '',
      token: '',
      checkCode: '',
      invoiceDate: ''
    }).then(res => {
      Taro.hideLoading()
      return res
    })
  })
}
