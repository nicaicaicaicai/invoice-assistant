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
                <AIIcon className="sheet_icon" name={action.icon} size={20} color={action.style.fill} />
                <Text className="home_action_sheet_row_title">{action.title}</Text>
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
  style: Record<string, any>
}

const actions: ActionModal[] = [
  {
    actionType: 'scan_invoice',
    title: '扫描发票',
    icon: 'scan1',
    page: 'ScanInvoice',
    style: {
      fill: '#a1dc63'
    }
  },
  {
    actionType: 'shoulu',
    title: '手录发票',
    icon: 'input',
    page: 'InputInvoice',
    style: {
      fill: '#48ADE7'
    }
  },
  {
    actionType: 'ocr',
    title: '智能拍票',
    icon: 'photo-ai',
    page: 'OCRInvoice',
    style: {
      fill: '#FA962A'
    }
  }
]
