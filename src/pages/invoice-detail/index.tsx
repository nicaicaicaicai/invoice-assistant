/**
 *  Created by pw on 2019-07-26 13:25.
 */

import Taro, { Component } from '@tarojs/taro'
import { PayerInfoNumber, PayerInfoName } from './PayerInfo'
import { InvoiceItem, SeparationLine, InvoiceMoney, InvoiceDetail, TotalView } from './InvoiceContainer'
import { formatInvoiceData } from './FormatInvoiceData'
import SVG_STAMP from '../../assets/images/invoice-detail/fp-stamp.svg'
import './InvoiceDetail.less'
import { inject, observer } from '@tarojs/mobx'
import { InvoiceStore } from '../../store/invoice'
import { InvoiceIF } from '../../interfaces/InvoiceIF'

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

  renderItem = (item, index) => {
    const { type, label, value, isShow } = item
    const InvoiceComponent = componentMap[type] || InvoiceItem
    return <InvoiceComponent key={index} value={value} label={label} isShow={isShow} {...this.props} />
    // switch (type) {
    //   case 'separationLine':
    //     return <SeparationLine key={index} isShow={isShow} />
    //   case 'money':
    //     return <InvoiceMoney key={index} value={value} label={label} />
    //   case 'list':
    //     // @ts-ignore
    //     return <InvoiceDetail key={index} value={value} label={label} {...this.props} />
    //   case 'total':
    //     // @ts-ignore
    //     return <TotalView key={index} value={value} label={label} />
    //   default:
    //     return <InvoiceItem key={index} value={value} label={label} isShow={isShow} />
    // }
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

    return (
      <div className={'invoice-detail-wrapper'}>
        <div className="invoice-content">
          <div className="header">
            <div className="stamp_big">
              <img src={SVG_STAMP} />
            </div>
            <div className="title">{title}</div>
          </div>
          <div className="line" />
          <div className="line mt-1" />
          <div className="detail">
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
            {items.map((item, index) => {
              return this.renderItem(item, index)
            })}
          </div>
        </div>
      </div>
    )
  }
}

const componentMap = {
  separationLine: SeparationLine,
  money: InvoiceMoney,
  list: InvoiceDetail,
  total: TotalView
}
