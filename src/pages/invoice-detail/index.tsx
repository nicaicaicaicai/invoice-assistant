/**
 *  Created by pw on 2019-07-26 13:25.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './InvoiceDetail.less'
import { PayerInfoNumber, PayerInfoName } from './PayerInfo'
import SeparationLine from './SeparationLine'
import InvoiceMoney from './InvoiceMoney'
import InvoiceItem from './InvoiceItem'
import InvoiceDetail from './InvoiceDetail'
import TotalView from './TotalView'
import { formatInvoiceData } from './FormatInvoiceData'
import SVG_STAMP from '../../assets/images/invoice-detail/fp-stamp.svg'
import { inject, observer } from '@tarojs/mobx'
import { InvoiceStore } from '../../store/invoice'
import { InvoiceIF } from '../../types/InvoiceIF'

interface Props {
  invoiceStore: InvoiceStore
}

interface State {
  message: string
  status: boolean
  ischeck: boolean
  data: InvoiceIF
}

@inject('invoiceStore')
@observer
export default class InvoiceDetailView extends Component<Props, State> {
  constructor(props) {
    super(props)
    const data = props.invoiceStore.getInvoiceById(this.$router.params.id)
    this.state = { message: '', status: false, ischeck: false, data }
  }

  componentDidMount() {}

  showMessage = message => {
    Taro.showToast(message)
  }

  showTitleMessage = message => {
    Taro.showToast(message)
  }

  renderItem(item) {
    const { type, label, value, isShow } = item
    if (type === 'separationLine') {
      return <SeparationLine value={value} label={label} isShow={isShow} {...this.props} />
    }
    if (type === 'money') {
      return <InvoiceMoney value={value} label={label} isShow={isShow} {...this.props} />
    }
    if (type === 'list') {
      return <InvoiceDetail value={value} label={label} isShow={isShow} {...this.props} />
    }
    if (type === 'total') {
      return <TotalView value={value} label={label} isShow={isShow} {...this.props} />
    }
    return <InvoiceItem value={value} label={label} isShow={isShow} {...this.props} />
    // const InvoiceComponent = componentMap[type] || InvoiceItem
    // return <InvoiceComponent value={value} label={label} isShow={isShow} {...this.props} />
  }

  render() {
    let { data, message, status } = this.state

    if (!data) return null

    // const payerInfo = api.getState()['@common'].payerInfo
    const payerInfo = []
    const {
      invoiceInfo,
      invoiceInfo: { buyer, taxIdNum, items, title }
    } = formatInvoiceData({ data }) as any

    if (message === undefined) {
      message = invoiceInfo.message
    }
    if (status === undefined) {
      status = invoiceInfo.status
    }

    const content = items.map((item, index) => {
      return <View key={String(index)}>{this.renderItem(item)}</View>
    })
    return (
      <View className="invoice-detail-wrapper">
        <View className="invoice-content">
          <View className="header">
            <View className="stamp_big">
              <img src={SVG_STAMP} />
            </View>
            <View className="title">{title}</View>
          </View>
          <View className="line" />
          <View className="line mt-1" />
          <View className="detail">
            <PayerInfoName
              title={buyer.label}
              status={status}
              invoiceDetail={buyer.value}
              showTitleMessage={this.showTitleMessage}
              payerInfo={payerInfo}
              message={message}
            />
            <PayerInfoNumber
              status={status}
              title={taxIdNum.label}
              invoiceDetail={taxIdNum.value}
              showMessage={this.showMessage}
              payerInfo={payerInfo}
              message={message}
            />
            {content}
          </View>
        </View>
      </View>
    )
  }
}

// const componentMap = {
//   separationLine: SeparationLine,
//   money: InvoiceMoney,
//   list: InvoiceDetail,
//   total: TotalView
// }
