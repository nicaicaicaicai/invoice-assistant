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
import { InvoiceStore } from '../../store/invoice'
import { scanInvoice } from '../../lib/InvoiceUtil'
import { InvoiceIF } from '../../types/InvoiceIF'

interface Props {
  isOpened: boolean
  mineStore?: MineStore
  invoiceStore?: InvoiceStore
  onAction: (action: string) => void
}

@inject('mineStore', 'invoiceStore')
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
    if (action.actionType === 'scan_invoice') {
      return scanInvoice().then((res: InvoiceIF) => {
        console.log(res)
        this.props.invoiceStore && this.props.invoiceStore.saveInvoceData([res])
      })
    }
    return Taro.navigateTo({
      url: `/pages/invoice-collect/${action.page}`
    })
  }

  render() {
    let title = '请选择添加类型'
    if (process.env.TARO_ENV === 'weapp') {
      title = ''
    }
    return (
      <AtActionSheet className="home_action_sheet" isOpened={this.props.isOpened} title={title}>
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
  actionType: 'scan_invoice' | 'ocr' | 'shoulu'
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
