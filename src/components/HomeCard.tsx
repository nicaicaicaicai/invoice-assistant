/**
 *  Created by pw on 2019-07-18 19:47.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { HomeInvoiceListIF } from '../interfaces/InvoiceIF'
import './HomeCard.less'

interface Props {
  homeModel: HomeInvoiceListIF
}

// class TopView extends Component<Props> {
//   render() {
//     const { homeModel } = this.props
//     return (
//       <View className="card_top_view">
//         <Text className="tag">{homeModel.tag}</Text>
//       </View>
//     )
//   }
// }
//
// class ContentView extends Component<Props> {
//   render() {
//     const { homeModel } = this.props
//     return (
//       <View className="content_view">
//         <img className="img" src={homeModel.url} />
//         <View className="right">
//           <Text className="title">{homeModel.title}</Text>
//           <Text className="desc">{homeModel.desc}</Text>
//         </View>
//       </View>
//     )
//   }
// }
//
// class AdditionView extends Component<Props> {
//   render() {
//     const { homeModel } = this.props
//     console.log(homeModel)
//     return (
//       <View className="addition_view">
//         <AdditionItemView />
//       </View>
//     )
//   }
// }
//
// class AdditionItemView extends Component {
//   render() {
//     return (
//       <View className="addition_row">
//         <View className="addition_row_content">
//           <Text className="row_text">可抵扣税额</Text>
//           <Text className="row_text">¥56</Text>
//         </View>
//         <View className="dotted_line" />
//       </View>
//     )
//   }
// }
//
// class BottomView extends Component<Props> {
//   render() {
//     const { homeModel } = this.props
//     return (
//       <View className="bottom_view">
//         <Text className="total_amount_label">总金额</Text>
//         <Text className="total_amount">{`￥${Number(homeModel.amount!.standard).toFixed(2)}`}</Text>
//       </View>
//     )
//   }
// }

export default class HomeCard extends Component<Props> {
  render() {
    const { homeModel } = this.props
    return (
      <View className="home_card">
        <View className="home_card_wrapper">
          <View className="card_top_view">
            <Text className="tag">{homeModel.tag}</Text>
          </View>
          <View className="content_view">
            <Image className="img" src={homeModel.url as string} />
            <View className="right">
              <Text className="title">{homeModel.title}</Text>
              <Text className="desc">{homeModel.desc}</Text>
            </View>
          </View>
          <View className="addition_view">
            <View className="addition_row">
              <View className="addition_row_content">
                <Text className="row_text">可抵扣税额</Text>
                <Text className="row_text">¥56</Text>
              </View>
              <View className="dotted_line" />
            </View>
          </View>
          <View className="bottom_view">
            <Text className="total_amount_label">总金额</Text>
            {homeModel.amount ? (
              <Text className="total_amount">{`￥${Number(homeModel.amount.standard).toFixed(2)}`}</Text>
            ) : (
              <Text>-</Text>
            )}
          </View>
        </View>
      </View>
    )
  }
}
