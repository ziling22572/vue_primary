module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,

  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
    })
    const entry = config.entry('app')
    entry.add('babel-polyfill').end()
    entry.add('classlist-polyfill').end()
    entry.add('@/mock').end()
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    disableHostCheck: true,
    // hot:true, //自动保存
    // open:true, //自动启动
    port: 1888,
    open: true,
    proxy: {
      '/api': {
        //本地服务接口地址
        target: 'http://127.0.0.1:8080/',
        //target: 'http://192.168.1.18/',
        // target: 'https://ngy.tgeem.cn/api/',
        // target: 'https://test.tgeem.cn/api/',

        //远程演示服务地址,可用于直接启动项目
        // target: 'http://114.115.141.113:8080',
        // target: 'http:// 127.0.0.1',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/test': {
        //本地服务接口地址
        target: 'http://127.0.0.1/',
        // target: 'http://192.168.0.110:8001/blade-bi/',
        //远程演示服务地址,可用于直接启动项目
        // target: 'http://114.115.141.113:8080',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/test': '/'
        }
      }
    }
  }
}
