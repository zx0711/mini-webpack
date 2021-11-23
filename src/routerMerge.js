/*
 * @Description:
 * @Author: xiao.zhang
 * @Date: 2021-11-17 11:39:09
 * @LastEditors: xiao.zhang
 * @LastEditTime: 2021-11-17 11:45:50
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { resolve } = require('path');

function MergeRouterPlugin(options) {}
MergeRouterPlugin.apply = function (compiler) {
  compiler.plugin('before-compile', (compilation, callback) => {
    // 最终生成的文件数据
    const data = {};
    const routePath = resolve('src/routes');
    const targetFile = resolve('src/router-config.js');

    // 获取路径下所有的文件和文件夹
    const dirs = fs.readdirSync(routePath)

    try{
      dirs.forEach((dir)=>{
          const routePath = resolve(`src/routes/${dir}`)
          
      })
    }catch{

    }
  });
};
