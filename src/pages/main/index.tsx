/**
 *  Created by pw on 2019-07-08 13:50.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.less'
import { HomeInvoiceListIF } from '../../interfaces/InvoiceIF'
import { InvoiceStore } from '../../store'
import HomeActionSheet from './HomeActionSheet'
import AIIcon from '../../components/AIIcon'
import HomeCard from './HomeCard'

interface Props {
  invoiceStore?: typeof InvoiceStore
}

interface State {
  isOpened: boolean
}

@inject('invoiceStore')
@observer
export default class Home extends Component<Props, State> {
  state = {
    isOpened: false
  }

  handleClickItem = (home: HomeInvoiceListIF) => {
    console.log(home)
  }

  handleActionSheet = () => {
    this.setState({ isOpened: true })
  }

  handleActionClick = (type: string) => {
    console.log(type)
    this.setState({ isOpened: false })
  }

  render() {
    if (!this.props.invoiceStore) {
      return null
    }
    return (
      <View className="home_wrapper">
        <AtList>
          {this.props.invoiceStore.homeList.map((homeModel: HomeInvoiceListIF) => {
            return <HomeCard key={homeModel.id} homeModel={homeModel} />
          })}
        </AtList>
        <View className="add_button" onClick={this.handleActionSheet}>
          <AIIcon className="icon" name="#EDico-plus-default" />
        </View>
        <HomeActionSheet isOpened={this.state.isOpened} onAction={type => this.handleActionClick(type)} />
      </View>
    )
  }
}

/*
<AtListItem
                key={invoice.id}
                className="home_list"
                title={invoice.title}
                note={invoice.desc}
                extraText={invoice.amount!.standard}
                thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
                onClick={() => this.handleClickItem(invoice)}
              />
 */
