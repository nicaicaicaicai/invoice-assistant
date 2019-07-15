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
import { URL_Invoice_Query } from '../../constants/UrlDefine'
import { InvoiceIF } from '../../interfaces/InvoiceIF'

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

@inject('invoiceStore')
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
    this.fnUpdateState('kprq', dateStr)
  }

  handleReset = () => {
    this.setState({ value: this.initData() })
  }

  handleSubmit = () => {
    if (this.fnChecResult(this.state.value)) {
      return
    }
    let values = {}
    Object.keys(this.state.value).forEach(key => {
      values[key] = this.state.value[key].value
    })
    console.log('===result===', values)

    const param = {
      staffId: 'czo94FiuAM0c00:t6A94FiiX80400',
      captcha: '',
      time: '',
      token: '',
      ...values
    }
    Fetch.POST(URL_Invoice_Query, param).then((res: InvoiceIF) => {
      this.props.invoiceStore.saveInvoceData(res).then(() => {
        return Taro.navigateBack()
      })
    })
  }

  initData = (): InputValue => {
    return {
      fpdm: { value: '', error: false },
      fphm: { value: '', error: false },
      kprq: { value: '', error: false },
      jym: { value: '', error: false }
      // fbMoney: { value: '', error: false },
      // code: { value: '', error: false }
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
        name: 'fpdm',
        title: '发票代码',
        type: 'text',
        placeholder: '请输入10或12位发票代码',
        clear: true
      },
      {
        name: 'fphm',
        title: '发票号码',
        type: 'text',
        placeholder: '请输入8位发票号码',
        clear: true
      },
      {
        name: 'kprq',
        title: '日期',
        type: 'text',
        placeholder: '请输入发票日期 例如:20160817',
        clear: false
      },
      {
        name: 'jym',
        title: '校验码',
        type: 'text',
        placeholder: '请输入后六位校验码',
        clear: true
      }
      // {
      //   name: 'fbMoney',
      //   title: '金额',
      //   type: 'number',
      //   placeholder: '请输入金额（不含税）',
      //   clear: true
      // },
      // {
      //   name: 'code',
      //   title: '验证码',
      //   type: 'text',
      //   placeholder: '验证码',
      //   clear: true
      // }
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
