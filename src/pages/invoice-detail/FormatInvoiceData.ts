/**
 *  Created by pw on 2019-07-26 14:40.
 */
import moment from 'moment'
import { InvoiceDetail } from '../../types/InvoiceIF'

export const INVOICE_TYPE = {
  DIGITAL_NORMAL: '增值税电子普通发票',
  DIGITAL_SPECIAL: '增值税电子专用发票',
  PAPER_NORMAL: '增值税普通发票',
  PAPER_SPECIAL: '增值税专用发票',
  PAPER_CAR: '机动车销售统一发票',
  PAPER_ROLL: '增值税普通发票（卷式)',
  PAPER_FEE: '通行费发票'
}

export function fnFormatDate(value, format = 'YYYY.MM.DD') {
  value = value && moment(value)
  return value ? value.format(format) : moment().format(format)
}

export function formatInvoiceData({ data }) {
  return { invoiceInfo: formatData({ data }), originalData: data }
}

function formatData({ data }) {
  const { master, details, message, status } = data
  const { form } = master
  let id = 'system_发票主体'
  return {
    title: INVOICE_TYPE[form[`E_${id}_发票类别`]],
    hasPdf: form[`E_${id}_来源`] === 'UPLOAD',
    message,
    status,
    buyer: {
      label: '购买方',
      value: {
        payer: form[`E_${id}_购买方名称`],
        payertaxno: form[`E_${id}_购买方纳税人识别号`],
        invdate: form[`E_${id}_invdate`]
      }
    },
    taxIdNum: {
      label: '纳税人识别号',
      value: {
        payer: form[`E_${id}_购买方名称`],
        payertaxno: form[`E_${id}_购买方纳税人识别号`],
        invdate: form[`E_${id}_invdate`]
      }
    },
    fpdm: form[`E_${id}_发票代码`],
    fphm: form[`E_${id}_发票号码`],
    items: [
      {
        label: '销售方',
        value: form[`E_${id}_销售方名称`]
      },
      {
        label: '发票代码',
        value: form[`E_${id}_发票代码`]
      },
      {
        label: '发票号码',
        value: form[`E_${id}_发票号码`]
      },
      {
        label: '开票时间',
        value: fnFormatDate(form[`E_${id}_发票日期`])
      },
      {
        type: 'money',
        label: '价税合计',
        value: form[`E_${id}_价税合计`]
      },
      {
        type: 'money',
        label: '税额',
        value: form[`E_${id}_税额`]
      },
      {
        label: '备注',
        value: form[`E_${id}_备注`]
      },
      {
        type: 'separationLine',
        isShow: true
      },
      {
        type: 'list',
        label: '项目明细',
        value: formatInvoiceDetails(details)
      },
      {
        type: 'total',
        label: '合计',
        value: total(form, id)
      }
    ]
  }
}
function total(form, id) {
  return [{ label: '金额', value: form[`E_${id}_发票金额`] }, { label: '税额', value: form[`E_${id}_税额`] }]
}

function formatInvoiceDetails(details = []) {
  return details.map((line: InvoiceDetail) => {
    const { form, ...others } = line
    let id = 'system_发票明细'
    return {
      name: form[`E_${id}_name`],
      amount: form[`E_${id}_金额`],
      taxRate: form[`E_${id}_税率`],
      tax: form[`E_${id}_税额`],
      ...others
    }
  })
}
