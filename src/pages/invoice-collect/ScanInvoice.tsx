/**
 *  Created by pw on 2019-07-15 17:12.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { qrInvoice } from '../../dataManager/Actions'

export default class ScanInvoice extends Component {
  constructor() {
    super()

    qrInvoice({
      qrcode: '01,10,011001900311,26105568,356.60,20190602,69609999443421834136,C348',
      captcha: '',
      time: '',
      token: '',
      checkCode: '',
      invoiceDate: ''
    }).then(res => {
      console.log(res)
    })

    // Taro.scanCode({
    //   onlyFromCamera: true
    // }).then(
    //   result => {
    //     if (result.result) {
    //     }
    //   },
    //   reason => {
    //     console.log(reason)
    //   }
    // )
  }

  render() {
    return <View />
  }
}
