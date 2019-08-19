/**
 *  Created by pw on 2019-07-25 20:56.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class About extends Component {
  render() {
    return (
      <View className="at-article">
        <View className="at-article__h1">发票助手</View>
        <View className="at-article__info">2019-07-30 合思</View>
        <View className="at-article__content">
          <View className="at-article__section">
            <View className="at-article__p">有问题请联系客服:400-999-8293</View>
          </View>
        </View>
      </View>
    )
  }
}
