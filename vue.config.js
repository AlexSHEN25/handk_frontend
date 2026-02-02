const webpack = require("webpack")

module.exports = {
  //设置为空打包后不分更目录还是多级目录
  publicPath: './',
  //build编译后存放静态文件的目录
  assetsDir: "static",

  // build编译后不生成资源MAP文件
  productionSourceMap: false,
  //css: {
  //loaderOptions: {
  // sass: {
  // 全局sass变量
  //additionalData: `@import "@/style/scss/common.scss";`
  //}
  //}
  //},
  // 配置插件参数

  configureWebpack: {
    plugins: [

      // 配置 jQuery 插件的参数

      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',

        'window.jQuery': 'jquery',

        Popper: ['popper.js', 'default']

      })

    ]

  },
  //开发服务,build后的生产模式还需nginx代理
  devServer: {
    open: false, //运行后自动打开浏览器
    proxy: {
      '/api': {
          // target: "http://www.handkcn.com/",
          target: "http://127.0.0.1:8000/",
          ws: false,
          pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    //config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },

  configureWebpack: {
    //性能提示
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: '~',
        name: "scuiChunks",
        cacheGroups: {
          //第三方库抽离
          vendor: {
            name: "modules",
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          elicons: {
            name: "elicons",
            test: /[\\/]node_modules[\\/]@element-plus[\\/]icons-vue[\\/]/
          },
          tinymce: {
            name: "tinymce",
            test: /[\\/]node_modules[\\/]tinymce[\\/]/
          },
          echarts: {
            name: "echarts",
            test: /[\\/]node_modules[\\/]echarts[\\/]/
          },
          xgplayer: {
            name: "xgplayer",
            test: /[\\/]node_modules[\\/]xgplayer.*[\\/]/
          },
          codemirror: {
            name: "codemirror",
            test: /[\\/]node_modules[\\/]codemirror[\\/]/
          }
        }
      }
    }
  }

}
