/**
 *  Created by pw on 2019-08-19 12:34.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import React from 'react'
import './AIButton.less'

interface Props {
  title: string
  className?: string
  onClick?: (event: ITouchEvent) => any
  children?: React.ReactNode
  type?: 'primary' | 'default' | 'secondary'
}

export default class AIButton extends Component<Props> {
  render() {
    const { title, className, onClick, children, type = 'defalut' } = this.props
    const cls = `ai_button ${className} ai_button_${type}`
    return (
      <View className={cls} onClick={onClick}>
        {title}
        {children}
      </View>
    )
  }
}
