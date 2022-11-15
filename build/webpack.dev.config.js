/*
 * @Author: wendy-web wendywen@tencent.com
 * @Date: 2021-11-17 13:35:36
 * @LastEditors: wendy-web wendywen@tencent.com
 * @LastEditTime: 2022-10-26 19:54:44
 * @FilePath: /webpack-interview/源码/7_extract-common/build/webpack.dev.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const commonConfig = require('./webpack.base.config');
const { smart: merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin')

const devConfig = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  // resolve是配置与路径相关的
  resolve: {
    extensions: ['.js', '.vue', '.json'],  // 省略文件后缀名
    // 配置别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
    // alias: {
    //   'assets': '@/assets',
    //   'common': '@/common',
    //   'components': '@/components',
    //   'network': '@/network',
    //   'views': '@/views',
    // }
  },
  devServer: {
    port: 8080, // 服务器启动的端口 8080
    contentBase: './dist', // 服务器静态资源文件夹
    progress: true, // 打包时显示进度条
    open: true, // 启动服务器后，自动打开浏览器
    compress: true, // 开启 gzip 压缩
    proxy: {
      '/api/Yixiantong': {
        target: 'http://study.jsplusplus.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
          'postcss-loader', // autoprefixer
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new vueLoaderPlugin(),
  ]
}

module.exports = merge(commonConfig, devConfig);