/**
 *  Created by pw on 2019-07-10 20:30.
 */

import Taro, { Component } from '@tarojs/taro'
import { Picker, View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { ReactText } from 'react'
import { inject, observer } from '@tarojs/mobx'
import moment from 'moment'
import './InputInvoice.less'
import { InvoiceStore } from '../../store/invoice'
import Fetch from '../../lib/Fetch'

interface ValueIF {
  value: ReactText
  error: boolean
}

interface InputValue {
  [key: string]: ValueIF
}

interface Props {
  invoiceStore: InvoiceStore
}

interface State {
  value: InputValue
  inputConfigList: InputIF[]
}

@inject('homeStore')
@observer
export default class InputInvoice extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.initData(),
      inputConfigList: this.fnGetInputConfig()
    }
  }

  handleChange = (type: string, changeValue: ReactText) => {
    this.fnUpdateState(type, changeValue)
  }

  handleDateChange = event => {
    const dateStr = moment(event.detail.value).format('YYYYMMDD')
    this.fnUpdateState('fbDate', dateStr)
  }

  handleReset = () => {
    this.setState({ value: this.initData() })
  }

  handleSubmit = () => {
    // const values = this.state.value
    // if (this.fnChecResult(values)) {
    //   return
    // }
    // console.log('===result===', values)
    const param = {
      staffId: 'Z3c94FTwBc0400:0200121420906665',
      captcha: '',
      time: '',
      token: '',
      fpdm: '032001700312',
      fphm: '01577056',
      kprq: '20180925',
      jym: '920911'
    }
    Fetch.POST('/api/v2/invoice/validation/query', param).then(res => {
      console.log(res)
    })
  }

  initData = (): InputValue => {
    return {
      fbdm: { value: '', error: false },
      fbhm: { value: '', error: false },
      fbDate: { value: '', error: false },
      fbMoney: { value: '', error: false },
      code: { value: '', error: false }
    }
  }

  fnUpdateState = (name: string, changeValue: ReactText) => {
    const value = this.state.value
    let item = value[name]
    item.value = changeValue
    item.error = !changeValue
    this.setState({ value })
  }

  fnGetInputConfig = (): InputIF[] => {
    return [
      {
        name: 'fbdm',
        title: '发票代码',
        type: 'text',
        placeholder: '请输入10或12位发票代码',
        clear: true
      },
      {
        name: 'fbhm',
        title: '发票号码',
        type: 'text',
        placeholder: '请输入8位发票号码',
        clear: true
      },
      {
        name: 'fbDate',
        title: '日期',
        type: 'text',
        placeholder: '请输入发票日期 例如:20160817',
        clear: false
      },
      {
        name: 'fbMoney',
        title: '金额',
        type: 'number',
        placeholder: '请输入金额（不含税）',
        clear: true
      },
      {
        name: 'code',
        title: '验证码',
        type: 'text',
        placeholder: '验证码',
        clear: true
      }
    ]
  }

  fnChecResult = (values: InputValue): boolean => {
    let hasError = false
    for (let key in values) {
      const item = values[key]
      if (item.error || !item.value) {
        hasError = true
        item.error = true
      }
    }
    return hasError
  }

  render() {
    return null

    const { inputConfigList, value } = this.state
    return (
      <View className="input_invoice_wrapper">
        <AtForm>
          {inputConfigList.map((inputConfig: InputIF) => {
            return inputConfig.name == 'fbDate' ? (
              <Picker mode="date" onChange={this.handleDateChange} value={new Date().toDateString()}>
                <AtInput
                  key={inputConfig.type}
                  {...inputConfig}
                  value={value[inputConfig.name].value}
                  error={value[inputConfig.name].error}
                  onChange={value => this.handleChange(inputConfig.name, value)}
                />
              </Picker>
            ) : (
              <AtInput
                key={inputConfig.type}
                {...inputConfig}
                value={value[inputConfig.name].value}
                error={value[inputConfig.name].error}
                onChange={value => this.handleChange(inputConfig.name, value)}
              />
            )
          })}
        </AtForm>
        <View className="at-row at-row__justify--around action">
          <AtButton className="at-col at-col-5" formType="reset" onClick={this.handleReset}>
            重置
          </AtButton>
          <AtButton className="at-col at-col-5" formType="submit" type={'primary'} onClick={this.handleSubmit}>
            提交
          </AtButton>
        </View>
      </View>
    )
  }
}

interface InputIF {
  name: string
  title: string
  type: string
  placeholder: string
  clear: boolean
}
