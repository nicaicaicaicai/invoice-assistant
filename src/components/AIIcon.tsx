/**
 *  Created by pw on 2019-07-10 16:15.
 */

import Taro, { Component } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'

interface Props {
  name: string
  className?: string
  style?: any
  onClick?: () => void
  size?: number
  color?: string
}

export default class AIIcon extends Component<Props> {
  handleOnClick = () => {
    let { onClick } = this.props
    onClick && onClick()
  }

  render() {
    let { name, className = '', style = {}, size, color } = this.props
    return (
      <AtIcon
        prefixClass="EDico"
        className={className}
        customStyle={style}
        value={name}
        color={color}
        size={size}
        onClick={this.handleOnClick}
      />
    )
  }
}
