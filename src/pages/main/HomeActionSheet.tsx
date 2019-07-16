/**
 *  Created by pw on 2019-07-09 15:48.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import AIIcon from '../../components/AIIcon'
import './HomeActionSheet.less'

interface Props {
  isOpened: boolean
  onAction: (action: string) => void
}

export default class HomeActionSheet extends Component<Props> {
  handleClick = (action: ActionModal) => {
    this.props.onAction(action.actionType)
    return Taro.navigateTo({
      url: `/pages/invoice-collect/${action.page}`
    })
  }

  render() {
    return (
      <AtActionSheet
        className="home_action_sheet"
        isOpened={this.props.isOpened}
        cancelText="取消"
        title="请选择添加类型"
      >
        {actions.map((action: ActionModal) => {
          return (
            <AtActionSheetItem key={action.actionType} onClick={() => this.handleClick(action)}>
              <View className="home_action_sheet_row">
                <AIIcon className="icon" name="#EDico-chongxiao" />
                <Text className="title">{action.title}</Text>
              </View>
            </AtActionSheetItem>
          )
        })}
      </AtActionSheet>
    )
  }
}

interface ActionModal {
  actionType: string
  title: string
  icon: string
  page: string
}

const actions: ActionModal[] = [
  {
    actionType: 'scan_invoice',
    title: '扫描发票',
    icon: '',
    page: 'ScanInvoice'
  },
  {
    actionType: 'shoulu',
    title: '手录发票',
    icon: '',
    page: 'InputInvoice'
  },
  {
    actionType: 'invoice_image',
    title: '发票照片',
    icon: '',
    page: 'SelectInvoiceImage'
  },
  {
    actionType: 'ocr',
    title: '智能拍票',
    icon: '',
    page: 'InputInvoice'
  }
]
