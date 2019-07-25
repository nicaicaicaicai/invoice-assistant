/**
 *  Created by pw on 2019-07-16 14:43.
 */
import * as url from '../constants/UrlDefine'
import Fetch from './FetchTaro'

export function getAttachmentToken() {
  return Fetch.GET(url.URL_Attacment_Upload_Token)
}

export function getAttachmentUrlByAttachmentKeys(keys: KeyIF[]) {
  return Fetch.POST(url.URL_GET_Attachment, { keys })
}

export function ocrRecognition(param) {
  return Fetch.POST(url.URL_ORC_Recognition, param)
}

export function getCompanyInfoList() {
  return Fetch.GET(url.COMPANY_INVOCIE_LIST)
}

export function updateCompanyInvoiceInfo(param) {
  const path = param.id ? `${url.COMPANY_INVOCIE_LIST}/$id` : url.COMPANY_INVOCIE_LIST
  return param.id ? Fetch.POST(path, param) : Fetch.PUT(url.COMPANY_INVOCIE_LIST, param)
}

export function deleteCompanyInfoById(id: string) {
  return Fetch.DELETE(`${url.COMPANY_INVOCIE_LIST}/$id`, { id })
}

interface KeyIF {
  [key: string]: string
}
