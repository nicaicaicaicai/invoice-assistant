/**
 *  Created by pw on 2019-07-24 16:33.
 */

export interface CompanyInvoiceIF {
  id: string
  version: number
  active: boolean
  createTime: number
  updateTime: number
  corporationId: string
  name: string
  payerNo: string
  account: string
  bank: string
  tel: string
  addr: string
  remark?: string
}

export interface CompanyInvoiceRespomseIF {
  items: CompanyInvoiceIF[]
}
