/**
 *  Created by pw on 2019-07-24 16:39.
 */
import { observable, action } from 'mobx'
import { CompanyInvoiceIF } from '../types/CompanyInvoiceIF'
import { getStorage, updateStorage } from '../dataManager/AIStore'
import { UserInfo } from '../types/UserInofIF'
import Taro from '@tarojs/taro'

const COMPANY_INVOICE_LIST = 'company_invoice_list'
const ADD_BUTTON_CONFIG = 'add_button_config'
const USER_INFO = 'user_info'

export class MineStore {
  @observable
  companyInvoiceList: CompanyInvoiceIF[]

  @observable
  addButtonConfig: String[]

  @observable
  userInfo: UserInfo | null

  constructor() {
    this.companyInvoiceList = []
    this.addButtonConfig = []
  }

  @action
  updateCompanyInvoiceList(list) {
    this.companyInvoiceList = list
    return updateStorage(COMPANY_INVOICE_LIST, JSON.stringify(list))
  }

  @action
  getCompanyInvoiceList() {
    return getStorage(COMPANY_INVOICE_LIST).then(value => {
      if (value) {
        this.companyInvoiceList = JSON.parse(value)
      }
    })
  }

  @action
  getCompanyInvoiceById(id: string): CompanyInvoiceIF | null {
    if (!this.companyInvoiceList) {
      return null
    }
    return this.companyInvoiceList.find(line => line.id === id) as CompanyInvoiceIF
  }

  @action
  getAddButtonConfig() {
    return getStorage(ADD_BUTTON_CONFIG).then(value => {
      if (value) {
        this.addButtonConfig = JSON.parse(value)
      }
      return this.addButtonConfig
    })
  }

  @action
  updateAddButtonConfig(list) {
    return updateStorage(ADD_BUTTON_CONFIG, JSON.stringify(list))
  }

  @action
  getUserInfo() {
    return getStorage(USER_INFO).then(value => {
      if (value) {
        this.userInfo = JSON.parse(value)
      }
      return this.userInfo
    })
  }

  @action
  updateUserInfo(userInfo: UserInfo) {
    return updateStorage(USER_INFO, JSON.stringify(userInfo))
  }

  @action
  clearCache() {
    Taro.clearStorage()
    this.userInfo = null
  }
}

export default new MineStore()

export type mineStore = MineStore
