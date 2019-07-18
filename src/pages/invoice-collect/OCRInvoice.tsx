/**
 *  Created by pw on 2019-07-15 21:01.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { getAttachmentToken, getAttachmentUrlByAttachmentKeys, ocrRecognition } from '../../dataManager/Actions'
import { inject, observer } from '@tarojs/mobx'
import { InvoiceStore } from '../../store/invoice'
import { USER_ID } from '../../constants/UserInfo'
import { AttachmentUrlItem } from '../../interfaces/InvoiceIF'

interface Props {
  invoiceStore: InvoiceStore
}

@inject('invoiceStore')
@observer
export default class OCRInvoice extends Component<Props> {
  componentDidMount() {}

  fnGenerateFileName = () => {
    const random = Math.floor(Math.random() * 1000) + 1
    const now = Date.now()
    return `${process.env.TARO_ENV}-${now}-${random}.png`
  }

  handleUpload = () => {
    const name = this.fnGenerateFileName()
    const _this = this
    return Taro.chooseImage({
      success: function(res) {
        getAttachmentToken().then((result: AttacmentResponseIF) => {
          const token = result.value.token
          const tempFilePaths = res.tempFilePaths
          const uploadTask = Taro.uploadFile({
            url: 'https://up.qbox.me',
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              name,
              token
            },
            success: function(res) {
              if (res.statusCode === 200) {
                const data = JSON.parse(res.data)
                getAttachmentUrlByAttachmentKeys([{ key: data.key }]).then(
                  (attachmentResult: AttachmentUrlResponse) => {
                    console.log(attachmentResult)
                    const promises = attachmentResult.items.map(item => {
                      return ocrRecognition({
                        fileName: item.key,
                        fileUrl: item.url,
                        staffId: USER_ID
                      })
                    })
                    Promise.all(promises).then(invoiceResult => {
                      let items = []
                      attachmentResult.items.forEach((attachment, index) => {
                        const line = invoiceResult[index]
                        // @ts-ignore
                        line.items = line.items.map(item => {
                          return { ...item, attachment }
                        })
                      })
                      invoiceResult.forEach(line => {
                        // @ts-ignore
                        items = items.concat(line.items)
                      })
                      // @ts-ignore
                      _this.props.invoiceStore.saveInvoceData(items).then(() => {
                        return Taro.navigateBack()
                      })
                    })
                  }
                )
              }
            }
          })
          uploadTask.progress(res => {
            console.log('上传进度', res.progress)
          })
        })
      }
    })
  }

  render() {
    return (
      <View>
        <Button onClick={this.handleUpload}>upload</Button>
      </View>
    )
  }
}

interface AttacmentResponseIF {
  value: AttachmentValueIF
}

interface AttachmentValueIF {
  token: string
}

export interface AttachmentUrlResponse {
  items: AttachmentUrlItem[]
}
