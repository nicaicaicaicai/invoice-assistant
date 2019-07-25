/**
 *  Created by pw on 2019-07-25 19:25.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import { MineStore } from '../../store/mine'

interface Props {
  mineStore: MineStore
}

interface State {
  dataSource: ListItemConfigIF[]
}

@inject('mineStore')
@observer
export default class AddButtonConfig extends Component<Props, State> {
  constructor(props) {
    super(props)
    let dataSource: ListItemConfigIF[] = [
      {
        title: '扫描发票',
        switchIsCheck: true,
        type: 'scan_invoice'
      },
      {
        title: '智能拍票',
        switchIsCheck: true,
        type: 'ocr'
      },
      {
        title: '手录发票',
        switchIsCheck: true,
        type: 'shoulu'
      }
    ]
    props.mineStore.getAddButtonConfig().then((configs: string[]) => {
      if (configs && configs.length) {
        dataSource = dataSource.map(line => {
          line.switchIsCheck = !!~configs.indexOf(line.type)
          return line
        })
      }
      this.setState({ dataSource })
    })
    this.setState({ dataSource })
  }

  handleChange = (e, type) => {
    let { dataSource } = this.state
    let item = dataSource.find(line => line.type === type) as ListItemConfigIF
    item.switchIsCheck = e.target.checked
    const list = dataSource.filter(line => line.switchIsCheck).map(line => line.type)
    if (list.length === 0) {
      item.switchIsCheck = true
      this.setState({ dataSource })
      return Taro.showModal({
        title: '提示',
        content: '必须打开一个'
      })
    }
    return this.props.mineStore.updateAddButtonConfig(list)
  }

  render() {
    const { dataSource } = this.state
    return (
      <View>
        <AtList>
          {dataSource.map(line => {
            return (
              <AtListItem
                key={line.type}
                isSwitch
                switchIsCheck={line.switchIsCheck}
                title={line.title}
                onSwitchChange={e => this.handleChange(e, line.type)}
              />
            )
          })}
        </AtList>
      </View>
    )
  }
}

interface ListItemConfigIF {
  title: string
  switchIsCheck: boolean
  type: string
}
