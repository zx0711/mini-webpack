/*
 * @Description:
 * @Author: xiao.zhang
 * @Date: 2021-09-14 21:32:34
 * @LastEditors: xiao.zhang
 * @LastEditTime: 2021-09-14 21:38:01
 */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
};
