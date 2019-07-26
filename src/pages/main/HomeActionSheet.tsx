/**
 *  Created by pw on 2019-07-09 15:48.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import AIIcon from '../../components/AIIcon'
import './HomeActionSheet.less'
import { inject, observer } from '@tarojs/mobx'
import { MineStore } from '../../store/mine'

interface Props {
  isOpened: boolean
  mineStore?: MineStore
  onAction: (action: string) => void
}

@inject('mineStore')
@observer
export default class HomeActionSheet extends Component<Props> {
  actions: ActionModal[]

  constructor(props) {
    super(props)
    this.actions = defalutActions
    props.mineStore.getAddButtonConfig().then((configs: string[]) => {
      if (configs && configs.length) {
        this.actions = defalutActions.filter(line => !!~configs.indexOf(line.actionType))
      }
    })
  }

  handleClick = (action: ActionModal) => {
    this.props.onAction(action.actionType)
    return Taro.navigateTo({
      url: `/pages/invoice-collect/${action.page}`
    })
  }

  render() {
    return (
      <AtActionSheet className="home_action_sheet" isOpened={this.props.isOpened} title="请选择添加类型">
        {this.actions.map((action: ActionModal) => {
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

const defalutActions: ActionModal[] = [
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
    actionType: 'ocr',
    title: '智能拍票',
    icon: 'photo-ai',
    page: 'OCRInvoice',
    style: {
      fill: '#FA962A'
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
  }
]
