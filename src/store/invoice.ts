/**
 *  Created by pw on 2019-07-11 16:49.
 */
import { observable, action } from 'mobx'
import { InvoiceIF, HomeInvoiceListIF } from '../interfaces/InvoiceIF'
import { getStorage, updateStorage } from '../dataManager/AIStore'
import { formatInvoice } from '../lib/InvoiceFormat'
const key = 'invoice_list'

export class InvoiceStore {
  @observable invliceList: InvoiceIF[]
  @observable homeList: HomeInvoiceListIF[]

  constructor() {
    this.invliceList = []
    this.homeList = []
    getStorage(key).then(value => {
      if (value) {
        this.invliceList = JSON.parse(value)
        this.homeList = this.fnFormatInvoceToHomeList(this.invliceList)
      }
    })
  }

  @action getInvoice() {
    return this.invliceList
  }

  @action getHomeInvoices() {
    return this.homeList
  }

  @action saveInvoceData(data: InvoiceIF[]) {
    this.invliceList = this.invliceList.concat(data)
    this.homeList = this.fnFormatInvoceToHomeList(this.invliceList)
    return getStorage(key).then(value => {
      let list = data
      if (value) {
        list = JSON.parse(value).concat(data)
      }
      return updateStorage(key, JSON.stringify(list))
    })
  }

  fnFormatInvoceToHomeList(invliceList) {
    return invliceList.map((invoice: InvoiceIF) => {
      return formatInvoice(invoice)
    })
  }
}

export default new InvoiceStore()

export type invoiceStore = InvoiceStore
