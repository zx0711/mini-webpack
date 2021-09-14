
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
        
        require('./src/index.js');
    })({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/*\n * @Description:\n * @Author: xiao.zhang\n * @Date: 2021-09-14 21:33:51\n * @LastEditors: xiao.zhang\n * @LastEditTime: 2021-09-14 21:59:26\n */\nconsole.log(_a[\"default\"]);\nconsole.log(_b[\"default\"]);"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n/*\n * @Description:\n * @Author: xiao.zhang\n * @Date: 2021-09-14 21:33:57\n * @LastEditors: xiao.zhang\n * @LastEditTime: 2021-09-14 21:59:11\n */\nvar _default = 1;\nexports[\"default\"] = _default;"},"./src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\n/*\n * @Description:\n * @Author: xiao.zhang\n * @Date: 2021-09-14 21:34:02\n * @LastEditors: xiao.zhang\n * @LastEditTime: 2021-09-14 21:59:18\n */\nfunction _default() {\n  console.log('I am b');\n}"}})
    