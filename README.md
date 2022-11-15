
# Front End || 前端 


# Code Language || 代码语言 ||| Bahasa Kode
## Typescript
## Vue3
## Html

# Code Style Format || 代码编写规范 ||| Format Gaya Kode
## Code Comment || 代码注释 ||| komentar kode

*  Code comments use English by default || 代码注释默认使用英文 ||| Komentar code gunakan bahasa Inggris secara default
* || + 代码注释使用中文
* ||| + Komentar kode dalam bahasa indonesia 

## Name Style Format
### Name format: camelCase => first letter lowercase  
### || 命名格式：camelCase => 首字母小写驼峰命名 
### ||| Format nama: camelCase => huruf pertama huruf kecil unta
* Preferred naming style format || 首选命名规范 ||| Format gaya penamaan yang disukai

## || typescript代码以';'结束

## || ''首选使用 



### Naming format for special requirements || 特殊要求的命名格式 ||| Format penamaan untuk persyaratan khusus

* Interface name style: Capitalized CamelCase 
* || Interface 命名格式: 首字母大写驼峰命名 Capitalized CamelCase 
* ||| Gaya nama antarmuka: Kapital CamelCase




# i18n key style || i18n键值样式 ||| gaya kunci i18n.

* Naming format: first letter lowercase camel case || 命名格式：首字母小写驼峰命名
* Keystyle": "nested" || 翻译路径：嵌套模式 
* Sample：components.sizeSelect.setSize => { path：components, filename: sizeSelect, key: setSize };


```bash

# 克隆项目
git clone http://109.106.255.153:3000/eason/erp-ui-dev.git

# 进入项目目录 web folder
cd webxxxxxx

# 安装依赖 install
# yarn --registry=https://registry.npmmirror.com
# yarn --registry=http://registry.npm.taobao.org/
yarn  install
# 启动服务 run serve
yarn dev

# 构建测试环境 yarn build:stage
# 构建生产环境 yarn build:prod
# 前端访问地址 http://localhost:2880
```
## 添加功能(EELIC)

12.  js to ts
11.  i18n zh,en,id: .\lang + .\components\LangSelect\
10.  i18n input verify: .\tool\login.vue + .\tool\register.vue
09.  i18n redis verify: .\utils\dict.js
08.  i18n sidebar: .\layout\components\Sidebar\index.vue
07.  i18n tagsview: .\layout\components\TagsView\index.vue
06.  i18n user: .\views\system\user\...
05.  i18n role: .\views\system\role\...
04.  i18n post: .\views\system\post\...
03.  i18n notice: .\views\system\notice\....
02.  i18n menu: .\views\system\menu\...
01.  i18n dept: .\views\system\dept\...

## 内置功能

1.  用户管理：用户是系统操作者，该功能主要完成系统用户配置。
2.  部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
3.  岗位管理：配置系统用户所属担任职务。
4.  菜单管理：配置系统菜单，操作权限，按钮权限标识等。
5.  角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
6.  字典管理：对系统中经常使用的一些较为固定的数据进行维护。
7.  参数管理：对系统动态配置常用参数。
8.  通知公告：系统通知公告信息发布维护。
9.  操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
10. 登录日志：系统登录日志记录查询包含登录异常。
11. 在线用户：当前系统中活跃用户状态监控。
12. 定时任务：在线（添加、修改、删除)任务调度包含执行结果日志。
13. 代码生成：前后端代码的生成（java、html、xml、sql）支持CRUD下载 。
14. 系统接口：根据业务代码自动生成相关的api接口文档。
15. 服务监控：监视当前系统CPU、内存、磁盘、堆栈等相关信息。
16. 缓存监控：对系统的缓存信息查询，命令统计等。
17. 在线构建器：拖动表单元素生成相应的HTML代码。
18. 连接池监视：监视当前系统数据库连接池状态，可进行分析SQL找出系统性能瓶颈。

## 在线体验
- demo user:
- admin/admin123  

演示地址：https://www.eelic.org/erp  
文档地址：http://doc.ruoyi.vip

<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">web ERP EELIC v1.0.4</h1>
<h4 align="center">基于SpringBoot+Vue3前后端分离的Java快速开发框架</h4>


## 平台简介
* 基于RuoYi v3.8.4
* 本仓库为前端技术栈 [Vue3](https://v3.cn.vuejs.org) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。
* 配套后端代码仓库地址xxx版本。
* 前端技术栈（[Vue2](https://cn.vuejs.org) + [Element](https://github.com/ElemeFE/element) + [Vue CLI](https://cli.vuejs.org/zh)）。
