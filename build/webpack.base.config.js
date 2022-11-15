/*
 * @Author: wendy-web wendywen@tencent.com
 * @Date: 2021-11-17 13:35:35
 * @LastEditors: wendy-web wendywen@tencent.com
 * @LastEditTime: 2022-10-26 12:13:48
 * @FilePath: /源码/7_extract-common/build/webpack.base.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}