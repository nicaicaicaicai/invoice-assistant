/**
 *  Created by pw on 2019-07-24 11:34.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { BASE_COLOR } from '../constants/Constant'
import { AtActivityIndicator } from 'taro-ui'
import './LoadingView.less'

interface Props {
  size?: number
  mode?: 'center' | 'normal'
  color?: string
  content?: string
  className?: string
  src?: string
}

export default class LoadingView extends Component<Props> {
  render() {
    const { color = BASE_COLOR, mode = 'normal', content = '', className = '', src } = this.props
    return (
      <View className={`loading_view_wrapper ${className}`}>
        <AtActivityIndicator content={content} color={color} mode={mode} />
        {src && <Image className="image" src={src} />}
      </View>
    )
  }
}
