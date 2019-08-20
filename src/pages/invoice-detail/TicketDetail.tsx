/**
 *  Created by pw on 2019-07-29 14:28.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { InvoiceStore } from '../../store/invoice'
import { InvoiceIF, MoneyIF } from '../../types/InvoiceIF'
import { fieldConfig, IField } from './ticketConfig'
import './TicketDetail.less'

interface Props {
  invoiceStore: InvoiceStore
}

interface State {
  data: InvoiceIF
}

// interface IView {
//   field: IField
//   data: InvoiceIF
// }

// function TicketTextView(props: IView) {
//   const { field, data } = props
//   debugger
//   return (
//     <View className="ticket_item">
//       <Text className="label">{field.label}</Text>
//       <Text className="value">{data.master.form[field.name]}</Text>
//     </View>
//   )
// }
//
// function MoneyView(props: IView) {
//   const { field, data } = props
//   const money = data.master.form[field.name] as MoneyIF
//   return (
//     <View className="ticket_item">
//       <Text className="label">{field.label}</Text>
//       <Text className="value">{Number(money.standard).toFixed(money.standardScale)}</Text>
//     </View>
//   )
// }

@inject('invoiceStore')
@observer
export default class TicketDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    const data = props.invoiceStore.getInvoiceById(this.$router.params.id)
    this.state = { data }
  }

  renderTicketView(data, field) {
    return (
      <View className="ticket_item">
        <Text className="label">{field.label}</Text>
        <Text className="value">{data.master.form[field.name]}</Text>
      </View>
    )
  }

  renderMoneyView(data, field) {
    const money = data.master.form[field.name] as MoneyIF
    return (
      <View className="ticket_item">
        <Text className="label">{field.label}</Text>
        <Text className="value">{Number(money.standard).toFixed(money.standardScale)}</Text>
      </View>
    )
  }

  render() {
    const { data } = this.state
    if (!data) {
      return null
    }
    const fields: IField[] = fieldConfig[data.master.entityId]
    if (!fields.length) {
      return null
    }

    return (
      <View className="ticket_detail">
        <View className="ticket_detail_header">
          <Image className="img" src={data.attachment!.thumbUrl} />
        </View>
        <View className="ticket_container">
          {fields.map((f, index) => {
            const { type } = f
            return (
              <View key={index}>
                {type === 'money' && this.renderMoneyView(data, f)}
                {type === 'text' && this.renderTicketView(data, f)}
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
