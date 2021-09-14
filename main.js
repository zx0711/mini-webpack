/*
 * @Description:
 * @Author: xiao.zhang
 * @Date: 2021-09-14 21:32:12
 * @LastEditors: xiao.zhang
 * @LastEditTime: 2021-09-14 22:32:59
 */
const fs = require('fs');
const path = require('path');
// 用于将输入代码解析城抽象语法树（AST）
const parser = require('@babel/parser');
// 用于对输入的抽象语法树进行遍历
const traverse = require('@babel/traverse').default;
// babel的核心模块，进行代码的转换
const babel = require('@babel/core');
const options = require('./mini-webpack.config');

class MiniWebpack {
  constructor(options) {
    this.options = options;
  }
  // 编译阶段，es6语法转es5
  parse = (filename) => {
    // 读取文件
    const fileBuffer = fs.readFileSync(filename, 'utf-8');
    // 转换成抽象语法树
    const ast = parser.parse(fileBuffer, { sourceType: 'module' });

    const dependencies = {};

    // 遍历抽象语法树
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        const newDirname =
          './' + path.join(dirname, node.source.value).replace('\\', '/');
        dependencies[node.source.value] = newDirname;
      },
    });
    // 将抽象语法树转换成代码
    const { code } = babel.transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });

    return {
      filename,
      dependencies,
      code,
    };
  };

  // 编译阶段，生成对象
  analyse = (entry) => {
    const entryModule = this.parse(entry);
    const graphArray = [entryModule];

    // 循环解析模块，保存信息
    for (let i = 0; i < graphArray.length; ++i) {
      const { dependencies } = graphArray[i];
      Object.keys(dependencies).forEach((filename) => {
        graphArray.push(this.parse(dependencies[filename]));
      });
    }

    const grash = {};
    graphArray.forEach(({ filename, dependencies, code }) => {
      grash[filename] = {
        dependencies,
        code,
      };
    });
    return grash;
  };
  // 输出阶段
  generate = (graph, entry) => {
    return `
    (function(graph){
        function require(filename){
            function localRequire(relativePath){
                return require(graph[filename].dependencies[relativePath]);
            }
            const exports = {};
            (function(require, exports, code){
                eval(code);
            })(localRequire, exports, graph[filename].code)
            return exports;
        }
        
        require('${entry}');
    })(${graph})
    `;
  };
  //输出阶段
  fileOutput = (output, code) => {
    const { path: dirPath, filename } = output;
    const outputPath = path.join(dirPath, filename);

    // 如果没有文件夹的话，生成文件夹
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    // 写入文件中
    fs.writeFileSync(outputPath, code, 'utf-8');
  };
  // 初始化之后，生成compiler,最先调用run方法开启下面的编译和输出阶段
  run = () => {
    const { entry, output } = this.options;
    const grash = this.analyse(entry);
    const grashStr = JSON.stringify(grash);
    const code = this.generate(grashStr, entry);
    this.fileOutput(output, code);
  };
}

const compiler = new MiniWebpack(options);
compiler.run();
