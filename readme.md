该工程为公司主页，采用框架为前端foundation5，后端nodejs，实现功能为页面展示，发送简历

工作目录为`server`目录，在`server`目录下执行`nodejs ./bin/www`即可

***

工程介绍

* bin 程序入口，监控3000端口
* node_modules 已安装的nodejs的模块
* public 文件、图片、js、css等资源文件，style.css为自定义层叠样式表，定义了各个子页面的颜色
* routes 路由，后端代码主要位于index.js中
* views 主页，前端代码主要位于index.html中
* app.js 导入express模块

***

测试情况

win7

* ie 测试通过
* chrome 测试通过

win8

* ie 测试通过

ubuntu

* 火狐 测试通过
* chrome 测试通过