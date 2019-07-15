/**
 *  Created by pw on 2019-07-11 16:49.
 */
import { observable, action } from 'mobx'
import { InvoiceIF } from '../interfaces/InvoiceIF'
export class InvoiceStore {
  @observable invliceList: InvoiceIF[]

  constructor() {}

  @action getInvoice() {
    return this.invliceList
  }

  @action saveInvoceData(data: InvoiceIF) {
    this.invliceList.push(data)
  }
}

export default new InvoiceStore()

export type invoiceStore = InvoiceStore
