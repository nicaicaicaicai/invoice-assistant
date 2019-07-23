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

interface KeyIF {
  [key: string]: string
}
