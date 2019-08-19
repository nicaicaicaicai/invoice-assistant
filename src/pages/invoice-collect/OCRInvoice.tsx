/**
 *  Created by pw on 2019-07-15 21:01.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import './OCRInvoice.less'
import { getAttachmentToken, getAttachmentUrlByAttachmentKeys, ocrRecognition } from '../../dataManager/Actions'
import { InvoiceStore } from '../../store/invoice'
import { USER_ID } from '../../constants/DevConfig'
import { AttachmentUrlItem, OCRUploadIF, HomeInvoiceListIF } from '../../types/InvoiceIF'
import LoadingView from '../../components/LoadingView'
import HomeCard from '../../components/HomeCard'
import { formatInvoice } from '../../lib/InvoiceFormat'

interface Props {
  invoiceStore: InvoiceStore
}

interface State {
  uploadList: OCRUploadIF[]
  dataSource: HomeInvoiceListIF[]
}

@inject('invoiceStore')
@observer
export default class OCRInvoice extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { uploadList: [], dataSource: [] }
  }

  fnGenerateFileName = () => {
    const random = Math.floor(Math.random() * 1000) + 1
    const now = Date.now()
    return `${process.env.TARO_ENV}-${now}-${random}.png`
  }

  fnUpdateUploadItem = (item: OCRUploadIF) => {
    let { uploadList } = this.state
    if (item.isFinsh) {
      uploadList = uploadList.filter(line => line.id === item.id)
    } else {
      let index = uploadList.findIndex(line => line.id === item.id)
      uploadList[index] = item
    }

    this.setState({ uploadList })
  }

  fnUploadFile = (item: OCRUploadIF, token) => {
    const name = this.fnGenerateFileName()
    const _this = this
    const uploadTask = Taro.uploadFile({
      url: 'https://up.qbox.me',
      filePath: item.path,
      name: 'file',
      formData: {
        name,
        token
      },
      success: function(res) {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          getAttachmentUrlByAttachmentKeys([{ key: data.key }]).then((attachmentResult: AttachmentUrlResponse) => {
            if (attachmentResult.items.length) {
              item.isUpload = false
              item.url = attachmentResult.items[0].thumbUrl
              _this.fnUpdateUploadItem(item)
            }
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
              return _this.props.invoiceStore.saveInvoceData(items).then(() => {
                item.isRecognition = false
                item.isFinsh = true
                _this.fnUpdateUploadItem(item)
                let { dataSource } = _this.state
                dataSource = dataSource.concat(items.map(formatInvoice))
                _this.setState({ dataSource })
              })
            })
          })
        }
      }
    })
    uploadTask.progress(res => {
      console.log('上传进度', res.progress)
    })
  }

  handleUpload = () => {
    let { uploadList } = this.state
    const _this = this
    return Taro.chooseImage({
      count: 9,
      success: function(res) {
        getAttachmentToken().then((result: AttacmentResponseIF) => {
          const token = result.value.token
          const tempFilePaths = res.tempFilePaths
          const length = uploadList.length
          const list = tempFilePaths.map((tempFilePath, index) => {
            return {
              id: length + index + '',
              isRecognition: true,
              isUpload: true,
              path: tempFilePath,
              isFinsh: false
            }
          })
          uploadList = uploadList.concat(list)
          _this.setState({ uploadList })
          list.forEach(item => {
            _this.fnUploadFile(item, token)
          })
        })
      }
    })
  }

  handleOK = () => {
    return Taro.navigateBack()
  }

  render() {
    const { uploadList, dataSource } = this.state
    return (
      <View className="ocr_invoice_wrapper">
        {uploadList.map((item, index) => {
          return item.isFinsh ? null : (
            <LoadingView
              key={index}
              content={item.isUpload ? '上传中...' : item.isRecognition ? '智能识别中...' : ''}
              src={item.url}
            />
          )
        })}
        {dataSource.map(line => {
          return <HomeCard key={line.id} homeModel={line} />
        })}
        <View className="ocr_bottom">
          {dataSource.length ? (
            <AtButton type={'primary'} className="button" onClick={this.handleOK}>
              完成
            </AtButton>
          ) : null}
          <AtButton className="button" onClick={this.handleUpload}>
            {dataSource.length ? '继续添加' : '添加'}
          </AtButton>
        </View>
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
