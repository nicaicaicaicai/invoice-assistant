/**
 *  Created by pw on 2019-07-11 16:49.
 */
import { observable, action } from 'mobx'
import { InvoiceIF, MoneyIF, HomeInvoiceListIF } from '../interfaces/InvoiceIF'
import { getStorage, updateStorage } from '../dataManager/AIStore'
import moment from 'moment'
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

  @action saveInvoceData(data: InvoiceIF) {
    this.invliceList.push(data)
    this.homeList = this.fnFormatInvoceToHomeList(this.invliceList)
    return getStorage(key).then(value => {
      let list = [data]
      if (value) {
        list = JSON.parse(value).concat([data])
      }
      return updateStorage(key, JSON.stringify(list))
    })
  }

  fnFormatInvoceToHomeList(invliceList) {
    return invliceList.map((invoice: InvoiceIF) => {
      return {
        id: invoice.master.id,
        title: invoice.master.form['E_system_发票主体_销售方名称'] as string,
        desc: moment(invoice.master.createTime).format('YYYY-MM-DD'),
        amount: invoice.master.form['E_system_发票主体_价税合计'] as MoneyIF
      }
    })
  }
}

export default new InvoiceStore()

export type invoiceStore = InvoiceStore
