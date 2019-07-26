/**
 *  Created by pw on 2019-07-26 13:30.
 */
import { CompanyInvoiceIF } from '../../interfaces/CompanyInvoiceIF'

export function checkPayerInfo(payerInfo) {
  const payerInfoArr: CompanyInvoiceIF[] = []

  let showError = false
  let checkPayerName = false
  let checkPayerNumber = ''

  if (payerInfo.payer === '个人') {
    return { showError: false }
  }

  const filterNameObj = payerInfoArr.find(el => {
    let invoicePayerName = payerInfo.payer && payerInfo.payer.replace(/（/, '(').replace(/）/, ')')
    let companyPayerName = el.name && el.name.replace(/（/, '(').replace(/）/, ')')
    return invoicePayerName === companyPayerName
  })

  if (filterNameObj) {
    checkPayerName = true
    if (!payerInfo.payertaxno) {
      showError = true
      checkPayerNumber = 'no'
    } else {
      if (filterNameObj.payerNo === payerInfo.payertaxno.toUpperCase()) {
        checkPayerNumber = ''
      } else {
        showError = true
        checkPayerNumber = ''
      }
    }
  } else {
    showError = true
    checkPayerName = false
    if (!payerInfo.payertaxno) {
      checkPayerNumber = 'no'
    } else {
      checkPayerNumber = !!payerInfoArr.find(el => el.payerNo === payerInfo.payertaxno.toUpperCase()) ? 'true' : ''
    }
  }
  if (payerInfo.invdate < 20170701) {
    return {
      showError: !checkPayerName,
      checkPayerName,
      checkPayerNumber: 'noCheck'
    }
  }
  return { showError, checkPayerName, checkPayerNumber }
}

export function isMoneyObject(obj) {
  return obj && typeof obj === 'object' && obj.standard
}
