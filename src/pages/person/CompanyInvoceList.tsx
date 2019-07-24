/**
 *  Created by pw on 2019-07-24 15:20.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './CompanyInvoceList.less'
import { getCompanyInfoList } from '../../dataManager/Actions'
import { CompanyInvoiceRespomseIF, CompanyInvoiceIF } from '../../interfaces/CompanyInvoiceIF'

const SVG_ADD_O = require('../../assets/images/person/add-o.svg')

export default class CompanyInvoceList extends Component {
  componentDidMount() {
    getCompanyInfoList().then((res: CompanyInvoiceRespomseIF) => {
      console.log(res)
    })
  }

  handleCreateCorpInfo = () => {}

  renderButton() {
    return (
      <View className="action-wrapper" onClick={this.handleCreateCorpInfo}>
        <View className="image_wrapper">
          <Image className="image" src={SVG_ADD_O} />
        </View>
        <View className="add_action_text">{'添加开票信息'}</View>
      </View>
    )
  }

  render() {
    return (
      <View className="company_invoice_list_wrapper">
        <View className="mine_company_info_list">{this.renderButton()}</View>
      </View>
    )
  }
}
