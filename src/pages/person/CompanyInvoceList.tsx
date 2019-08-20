/**
 *  Created by pw on 2019-07-24 15:20.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './CompanyInvoceList.less'
import { getCompanyInfoList } from '../../dataManager/Actions'
import { CompanyInvoiceRespomseIF, CompanyInvoiceIF } from '../../types/CompanyInvoiceIF'
import { inject, observer } from '@tarojs/mobx'
import { MineStore } from '../../store/mine'

const SVG_ADD_O = require('../../assets/images/person/add-o.svg')

interface Props {
  mineStore: MineStore
}

@inject('mineStore')
@observer
export default class CompanyInvoceList extends Component<Props> {
  componentDidMount() {
    this.props.mineStore.getCompanyInvoiceList()
    getCompanyInfoList().then((res: CompanyInvoiceRespomseIF) => {
      return this.props.mineStore.updateCompanyInvoiceList(res.items)
    })
  }

  handleCreateCorpInfo = (componyInvoiceInfo?: CompanyInvoiceIF) => {
    const path = '/pages/person/AddCompanyInvoiceInfo'
    const url = componyInvoiceInfo ? `${path}?id=${componyInvoiceInfo.id}` : path
    return Taro.navigateTo({
      url
    })
  }

  handleGetQrCode = () => {}

  handleCopy = () => {}

  renderButton() {
    return (
      <View className="action-wrapper" onClick={() => this.handleCreateCorpInfo()}>
        <View className="image_wrapper">
          <Image className="image" src={SVG_ADD_O} />
        </View>
        <View className="add_action_text">{'添加开票信息'}</View>
      </View>
    )
  }

  renderCompanyBaseInfo(componyInvoiceInfo) {
    let keys = Object.keys(componyInvoiceInfo)
    keys = keys.filter(key => !!titleBoxObj[key])
    return (
      <View>
        {keys.map(key => {
          const label = titleBoxObj[key]
          return (
            <View key={key} className="info-line">
              <span className="info-line-title">{label}</span>
              <span className="info-line-value">{componyInvoiceInfo[key] || '无'}</span>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View className="company_invoice_list_wrapper">
        <View className="mine_company_info_list">
          {this.renderButton()}
          {this.props.mineStore.companyInvoiceList &&
            this.props.mineStore.companyInvoiceList.map(componyInvoiceInfo => {
              return (
                <View key={componyInvoiceInfo.id} className="info-wrapper">
                  <View className="info-line info-line-first">
                    <span className="info-line-value info-line-first">{componyInvoiceInfo.name}</span>
                    <View className="edit-btn-wrapper" onClick={() => this.handleCreateCorpInfo(componyInvoiceInfo)}>
                      <span>{'编辑'}</span>
                    </View>
                  </View>
                  <View className="divide-line-top" />
                  {this.renderCompanyBaseInfo(componyInvoiceInfo)}
                  {/*{Object.keys(componyInvoiceInfo).map(key => {*/}
                  {/*const label = titleBoxObj[key]*/}
                  {/*if (!!label) {*/}
                  {/*return (*/}
                  {/*<View key={key} className="info-line">*/}
                  {/*<span className="info-line-title">{label}</span>*/}
                  {/*<span className="info-line-value">{componyInvoiceInfo[key] || '无'}</span>*/}
                  {/*</View>*/}
                  {/*)*/}
                  {/*}*/}
                  {/*return null*/}
                  {/*})}*/}
                  <View className="divide-line-bottom" />
                  <View className="info-line-remark">
                    <span>
                      <View>{'备注：'}</View>
                      <View>{componyInvoiceInfo.remark || '无'}</View>
                    </span>
                    <span>{'备注信息不会被复制'}</span>
                  </View>
                  <View className="info-btn-wrapper">
                    <View className="info-btn info-btn-showCheckBox" onClick={this.handleCopy}>
                      {'复制开票信息'}
                    </View>
                    <View className="info-btn info-btn-qrCode" onClick={this.handleGetQrCode}>
                      {'开票二维码'}
                    </View>
                  </View>
                </View>
              )
            })}
        </View>
      </View>
    )
  }
}

const titleBoxObj = {
  payerNo: '纳税人识别号',
  addr: '地址',
  tel: '电话',
  bank: '开户行',
  account: '企业账号'
}
