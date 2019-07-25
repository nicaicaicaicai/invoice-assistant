import 'taro-ui/dist/style/index.scss'
import './assets/IconFont/iconfont.css'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Main from './pages/main'

import store from './store'
import './app.less'
import { login } from './lib/init'
import { BASE_COLOR } from './constants/Constant'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/main/index',
      'pages/invoice-collect/InputInvoice', //手输发票
      'pages/invoice-collect/ScanInvoice', //扫描发票
      'pages/invoice-collect/OCRInvoice', //OCR
      'pages/person/index',
      'pages/person/CompanyInvoceList', //企业开票列表
      'pages/person/AddCompanyInvoiceInfo', //添加企业开票列表
      'pages/person/AddButtonConfig', //添加按钮配置
      'pages/person/About'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#626567',
      selectedColor: BASE_COLOR,
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/main/index',
          text: '主页',
          iconPath: './assets/images/tabbar/home.png',
          selectedIconPath: './assets/images/tabbar/home_focus.png'
        },
        {
          pagePath: 'pages/person/index',
          text: '个人',
          iconPath: './assets/images/tabbar/person.png',
          selectedIconPath: './assets/images/tabbar/person_focus.png'
        }
      ]
    }
  }

  componentDidMount() {
    login()
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
