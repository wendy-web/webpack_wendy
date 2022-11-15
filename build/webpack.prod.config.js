const path = require('path');

const commonConfig = require('./webpack.base.config');
const { smart: merge } = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodConfig = {
  mode: 'production',
  entry: {
    // index 入口
    index: './src/index.js',
    // other 入口
    other: './src/other.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // autoprefixer
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            outputPath: '/img/',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/main.[contentHash:8].css',
    }),
    // 给 index.html 使用的
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // html 使用的 js 文件
      chunks: ['index', 'vendor', 'common']
    }),
    // 给 other.html 使用的
    new HtmlWebpackPlugin({
      template: './src/other.html',
      filename: 'other.html',
      // html 使用的 js 文件
      chunks: ['other', 'common']
    }),
  ],
  optimization: {
    minimizer: [
      // 压缩JS
      new TerserPlugin(),
      // 压缩CSS
      new OptimizeCssAssetsWebpackPlugin(),
    ],
    // 代码分割
    splitChunks: {
      // all      对 同步、异步代码 都做代码分割
      // async    只对 异步代码 做代码分割
      // initial  只对 同步代码 做代码分割
      // 同步代码，例如 import lodash from 'lodash'
      // 异步代码，例如 import('lodash')
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendor: {
          // 每个组的名字
          name: 'vendor',
          // 优先级，优先级越高，越先检测处理
          // 第三方模块 可能也会被作为 公共模块 来检测处理，通过高优先级，达到先被当做 第三方模块 来检测处理
          priority: 1,
          // 检测方法，例如：检测模块是否来自 node_modules
          test: /node_modules/,
          // 实际开发中，可以写 5 * 1024，也就是 5kb
          // 但这里为了看到 代码分割 的效果，我们把值设置到最小，也就是 0
          minSize: 0,
          // 检测模块被引用了几次
          // 对于 第三方模块 而言，引用 1 次就应该单独打包
          // 对于 公共模块 而言，引用 2 次以上就应该单独打包
          minChunks: 1,
        },
        // 公共模块
        common: {
          // 每个组的名字
          name: 'common',
          // 优先级，优先级越高，越先检测处理
          priority: 0,
          // 实际开发中，可以写 5 * 1024，也就是 5kb
          // 但这里为了看到 代码分割 的效果，我们把值设置到最小，也就是 0
          minSize: 0,
          // 检测模块被引用了几次
          // 对于 第三方模块 而言，引用 1 次就应该单独打包
          // 对于 公共模块 而言，引用 2 次以上就应该单独打包
          minChunks: 2,
        },
      },
    },
  },
  output: {
    filename: '[name].[contentHash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
};

module.exports = merge(commonConfig, prodConfig);
