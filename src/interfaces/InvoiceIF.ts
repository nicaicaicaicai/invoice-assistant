/**
 *  Created by pw on 2019-07-11 17:01.
 */

export interface InvoiceIF {
  master: InvoiceDetail
  details: InvoiceDetail[]
  message: string
  status: string
  ischeck: boolean
  attachment?: AttachmentUrlItem
}

export interface InvoiceDetail {
  id: string
  version: number
  active: boolean
  createTime: number
  updateTime: number
  name: string
  nameSpell: string
  code: string
  corporationId: string
  form: FormIF
  ledgerAmount?: any
  ledgerAmountModel?: any
  totalCount: number
  useCount: number
  entityId: string
  platformId: string
  source: string
  masterId: string
  index: number
  visibility: VisibilityIF
  ownerId: string
}

export interface MoneyIF {
  standard: string
  standardStrCode: string
  standardNumCode: string
  standardSymbol: string
  standardUnit: string
  standardScale: number
}

interface FormIF {
  [key: string]: MoneyIF | number | boolean | string
}

export interface VisibilityIF {
  fullVisible: boolean
  staffs?: any
  roles?: any
  departments?: any
  departmentsIncludeChildren: boolean
}

export interface HomeInvoiceListIF {
  id: string
  title: string
  entityId: string
  desc?: string
  amount?: MoneyIF
  tag?: string
  url?: string
}

export interface AttachmentUrlItem {
  id: string
  key: string
  url: string
  thumbUrl: string
}

export interface OCRUploadIF {
  id: string
  isUpload: boolean
  isRecognition: boolean
  isFinsh: boolean
  path: string
  url?: string
}
