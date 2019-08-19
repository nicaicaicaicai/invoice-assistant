/**
 *  Created by pw on 2019-07-15 17:12.
 */

import Taro, { Component } from '@tarojs/taro'
import { qrInvoice } from '../../dataManager/Actions'
import { inject, observer } from '@tarojs/mobx'
import { InvoiceStore } from '../../store/invoice'
import { HomeInvoiceListIF, InvoiceIF } from '../../types/InvoiceIF'
import { formatInvoice } from '../../lib/InvoiceFormat'
import HomeCard from '../../components/HomeCard'

interface Props {
  invoiceStore: InvoiceStore
}

interface State {
  dataSource: HomeInvoiceListIF
}

@inject('invoiceStore')
@observer
export default class ScanInvoice extends Component<Props, State> {
  state = {
    dataSource: {} as HomeInvoiceListIF
  }

  componentDidMount() {
    const code = this.$router.params.code
    qrInvoice({
      qrcode: code,
      captcha: '',
      time: '',
      token: '',
      checkCode: '',
      invoiceDate: ''
    }).then((res: InvoiceIF) => {
      return this.props.invoiceStore.saveInvoceData([res]).then(() => {
        const dataSource = formatInvoice(res)
        this.setState({ dataSource })
      })
    })
  }

  render() {
    const { dataSource } = this.state
    if (!dataSource.id) {
      return null
    }
    return <HomeCard key={dataSource.id} homeModel={dataSource} />
  }
}
