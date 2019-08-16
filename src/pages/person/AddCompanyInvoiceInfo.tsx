/**
 *  Created by pw on 2019-07-24 18:52.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ReactText } from 'react'
import { inject, observer } from '@tarojs/mobx'
import { MineStore } from '../../store/mine'
import { AtButton, AtForm, AtInput } from 'taro-ui'
import './AddCompanyInvoiceInfo.less'
import { updateCompanyInvoiceInfo, getCompanyInfoList, deleteCompanyInfoById } from '../../dataManager/Actions'
import { CompanyInvoiceIF, CompanyInvoiceRespomseIF } from '../../types/CompanyInvoiceIF'

interface ValueIF {
  value: ReactText
  error: boolean
}

interface Props {
  mineStore: MineStore
}

interface InputValue {
  [key: string]: ValueIF
}

interface State {
  value: InputValue
  inputConfigList: InputIF[]
  invoiceInfo: CompanyInvoiceIF
}

@inject('mineStore')
@observer
export default class AddCompanyInvoiceInfo extends Component<Props, State> {
  constructor(props) {
    super(props)
    const invoiceInfo = props.mineStore.getCompanyInvoiceById(this.$router.params.id) || {}
    this.state = {
      value: this.fnInitData(invoiceInfo),
      inputConfigList: this.fnGetInputConfig(),
      invoiceInfo
    }
  }

  handleSubmit = () => {
    if (this.fnChecResult(this.state.value)) {
      return
    }
    const { id } = this.state.invoiceInfo
    let values = id ? { id } : {}
    Object.keys(this.state.value).forEach(key => {
      values[key] = this.state.value[key].value
    })
    updateCompanyInvoiceInfo(values).then(() => {
      Taro.navigateBack().then(() => {
        this.fnGetCompanyInvoiceList()
      })
    })
  }

  handleDelete = () => {
    const id = this.state.invoiceInfo.id
    const _this = this
    return Taro.showModal({
      title: '确定删除？',
      content: '删除操作无法撤销',
      confirmText: '删除'
    }).then(() => {
      deleteCompanyInfoById(id).then(() => {
        _this.fnGetCompanyInvoiceList().then(() => {
          return Taro.navigateBack()
        })
        Taro.showToast({ title: '删除成功' })
      })
    })
  }

  handleChange = (type: string, changeValue: ReactText) => {
    this.fnUpdateState(type, changeValue)
  }

  fnGetCompanyInvoiceList = () => {
    return getCompanyInfoList().then((res: CompanyInvoiceRespomseIF) => {
      return this.props.mineStore.updateCompanyInvoiceList(res.items)
    })
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

  fnUpdateState = (name: string, changeValue: ReactText) => {
    const value = this.state.value
    let item = value[name]
    item.value = changeValue
    item.error = !changeValue
    this.setState({ value })
  }

  fnInitData = (invoiceInfo: CompanyInvoiceIF): InputValue => {
    return {
      name: { value: invoiceInfo.name, error: false },
      payerNo: { value: invoiceInfo.payerNo, error: false },
      addr: { value: invoiceInfo.addr, error: false },
      tel: { value: invoiceInfo.tel, error: false },
      bank: { value: invoiceInfo.bank, error: false },
      account: { value: invoiceInfo.account, error: false },
      remark: { value: invoiceInfo.remark || '', error: false }
    }
  }

  fnGetInputConfig = (): InputIF[] => {
    return [
      {
        name: 'name',
        title: '企业名称',
        type: 'text',
        placeholder: '请输入企业名称',
        clear: true,
        maxLength: 30
      },
      {
        name: 'payerNo',
        title: '纳税人识别号',
        type: 'text',
        placeholder: '请输入纳税人识别号',
        clear: true,
        maxLength: 20
      },
      {
        name: 'addr',
        title: '地址',
        type: 'text',
        placeholder: '请输地址',
        clear: false,
        maxLength: 32
      },
      {
        name: 'tel',
        title: '电话',
        type: 'number',
        placeholder: '请输入电话',
        clear: true,
        maxLength: 50
      },
      {
        name: 'bank',
        title: '开户行',
        type: 'text',
        placeholder: '请输入开户行',
        clear: false,
        maxLength: 20
      },
      {
        name: 'account',
        title: '企业账号',
        type: 'text',
        placeholder: '请输入企业账号',
        clear: false,
        maxLength: 50
      },
      {
        name: 'remark',
        title: '备注',
        type: 'text',
        placeholder: '请输入备注',
        clear: false,
        maxLength: 50
      }
    ]
  }

  render() {
    const { inputConfigList, value, invoiceInfo } = this.state
    const btnCls = invoiceInfo.id ? 'at-col-5' : 'at-col-11'
    return (
      <View className="add_company_invoice_info">
        <AtForm>
          {inputConfigList.map((inputConfig: InputIF) => {
            return (
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
          {invoiceInfo.id ? (
            <AtButton className={`at-col ${btnCls} action_del_btn`} type={'primary'} onClick={this.handleDelete}>
              删除
            </AtButton>
          ) : null}
          <AtButton
            className={`at-col ${btnCls} action_btn`}
            formType="submit"
            type={'primary'}
            onClick={this.handleSubmit}
          >
            保存
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
  maxLength: number
}
