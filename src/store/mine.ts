/**
 *  Created by pw on 2019-07-24 16:39.
 */
import { observable, action } from 'mobx'
import { CompanyInvoiceIF } from '../interfaces/CompanyInvoiceIF'
import { getStorage, updateStorage } from '../dataManager/AIStore'

const COMPANY_INVOICE_LIST = 'company_invoice_list'

export class MineStore {
  @observable
  companyInvoiceList: CompanyInvoiceIF[]

  constructor() {
    this.companyInvoiceList = []
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
  getCompanyInvoiceById(id: string): CompanyInvoiceIF {
    return this.companyInvoiceList.find(line => line.id === id) as CompanyInvoiceIF
  }
}

export default new MineStore()

export type mineStore = MineStore
