/**
 *  Created by pw on 2019-07-18 19:47.
 */

import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './HomeCard.less'
import { HomeInvoiceListIF } from '../../interfaces/InvoiceIF'

interface Props {
  homeModel: HomeInvoiceListIF
}

export default function HomeCard(props: Props) {
  const { homeModel } = props
  return (
    <View className="home_card">
      <View className="home_card_wrapper">
        <TopView homeModel={homeModel} />
        <ContentView homeModel={homeModel} />
        <AdditionView homeModel={homeModel} />
        <BottomView homeModel={homeModel} />
      </View>
    </View>
  )
}

function TopView(props: Props) {
  const { homeModel } = props
  return (
    <View className="card_top_view">
      <Text className="tag">{homeModel.tag}</Text>
    </View>
  )
}

function ContentView(props: Props) {
  const { homeModel } = props
  return (
    <View className="content_view">
      <img className="img" src={homeModel.url} />
      <View className="right">
        <Text className="title">{homeModel.title}</Text>
        <Text className="desc">{homeModel.desc}</Text>
      </View>
    </View>
  )
}

function AdditionView(props: Props) {
  const { homeModel } = props
  console.log(homeModel)
  return (
    <View className="addition_view">
      <AdditionItemView />
    </View>
  )
}

function AdditionItemView() {
  return (
    <View className="addition_row">
      <View className="addition_row_content">
        <Text className="row_text">可抵扣税额</Text>
        <Text className="row_text">¥56</Text>
      </View>
      <View className="dotted_line" />
    </View>
  )
}

function BottomView(props: Props) {
  const { homeModel } = props
  return (
    <View className="bottom_view">
      <Text className="total_amount_label">总金额</Text>
      <Text className="total_amount">{`￥${Number(homeModel.amount!.standard).toFixed(2)}`}</Text>
    </View>
  )
}
