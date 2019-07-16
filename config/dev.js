const isH5 = process.env.CLIENT_ENV === 'h5'

const HOST = '"http://460mix.ekuaibao.net"'

module.exports = {
  env: {
    NODE_ENV: '"development"',
    BASE_URL: HOST
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  weapp: {
    module: {
      postcss: {
        // 小程序端样式引用本地资源内联
        url: {
          enable: true,
          limit: 102400000000
        }
      }
    }
  },
  h5: {
    devServer: {
      port: 9900,
      open: false,
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
