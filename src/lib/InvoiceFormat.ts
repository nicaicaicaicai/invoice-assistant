/**
 *  Created by pw on 2019-07-18 10:49.
 */
import moment from 'moment'
import { HomeInvoiceListIF, InvoiceIF, MoneyIF, AttachmentUrlItem } from '../interfaces/InvoiceIF'

export function formatInvoice(invoice: InvoiceIF): HomeInvoiceListIF {
  const { entityId } = invoice.master
  const func = invoiceFormatMap[entityId]
  return func(invoice)
}

const invoiceFormatMap: { [key: string]: (param: InvoiceIF) => HomeInvoiceListIF } = {
  system_火车票: formatTrain,
  system_出租车票: formatTaxi,
  system_发票主体: formatInvoiceData,
  system_过路费发票: formatLoadCost,
  system_航空运输电子客票行程单: formatFlight,
  system_客运汽车发票: formatPassengerTicket,
  system_定额发票: formatQuotaInvoice,
  system_其他: formatOther
}

function formatInvoiceData(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = form[`E_${entityId}_销售方名称`] as string
  const desc = moment(invoice.master.createTime).format('YYYY-MM-DD') as string
  const amount = (form[`E_${entityId}_价税合计`] as MoneyIF) || (form[`E_${entityId}_发票金额`] as MoneyIF)
  return { id, title, desc, amount, tag: '增值税发票', url: attachment.thumbUrl, entityId }
}

function formatQuotaInvoice(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = form[`E_${entityId}_销售方名称`] as string
  const desc = moment(invoice.master.createTime).format('YYYY-MM-DD') as string
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '定额发票', url: attachment.thumbUrl, entityId }
}

function formatTrain(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = `${form[`E_${entityId}_上车车站`]} - ${form[`E_${entityId}_下车车站`]}` as string
  const date = getDate(form['E_system_火车票_乘车时间'])
  const desc = `${date} ${form['E_system_火车票_车次']} ${form['E_system_火车票_乘车人姓名']}` as string
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '火车票', url: attachment.thumbUrl, entityId }
}

function formatTaxi(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const date1 = getDate(form[`E_${entityId}_上车时间`])
  const date2 = getDate(form[`E_${entityId}_下车时间`], 'HH:mm')
  const distance = form[`E_${entityId}_里程`] ? `${form[`E_${entityId}_里程`]}km` : ''
  const desc = `${date1}-${date2} ${distance}` as string
  const title = form[`E_${entityId}_发票所在地`]
    ? `出租车发票（${form[`E_${entityId}_发票所在地`]}）`
    : ('出租车发票' as string)
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '出租车票', url: attachment.thumbUrl, entityId }
}

function formatLoadCost(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = `${form[`E_${entityId}_入口`]} - ${form[`E_${entityId}_出口`]}` as string
  const desc = getDate(form[`E_${entityId}_时间`]) as string
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '过路费票', url: attachment.thumbUrl, entityId }
}

function formatFlight(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = `${form[`E_${entityId}_出发站`]} - ${form[`E_${entityId}_到达站`]}` as string
  const date = getDate(form[`E_${entityId}_乘机时间`])
  const desc = `${date} ${form[`E_${entityId}_航班号`]} ${form[`E_${entityId}_乘机人姓名`]}` as string
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '机票行程票', url: attachment.thumbUrl, entityId }
}

function formatPassengerTicket(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = `${form[`E_${entityId}_出发车站`]} - ${form[`E_${entityId}_达到车站`]}` as string
  const date = getDate(form[`E_${entityId}_时间`])
  const desc = `${date} ${form[`E_${entityId}_姓名`]}` as string
  const amount = form[`E_${entityId}_金额`] as MoneyIF
  return { id, title, desc, amount, tag: '客运汽车票', url: attachment.thumbUrl, entityId }
}

function formatOther(invoice: InvoiceIF) {
  const { attachment = {} as AttachmentUrlItem } = invoice
  const { id, form, entityId } = invoice.master
  const title = `其它`
  const desc = getDate(form[`E_${entityId}_日期`], 'YYYY年MM月DD日')
  return { id, title, desc, tag: '其它票据', url: attachment.thumbUrl, entityId }
}

function getDate(date?: any, format?: string) {
  const mom = date ? moment(date) : moment()
  const formatStr = format ? format : 'YYYY年MM月DD日 HH:mm'
  return mom.format(formatStr)
}
