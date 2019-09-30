# PaperStack API Server

[![Build Status](https://travis-ci.com/super-dash/paperstack-api-server.svg?branch=master)](https://travis-ci.com/super-dash/paperstack-api-server)

## 开发

我们的服务器软件运行于Node.js 12，所使用的技术栈为：

1. yarn
2. TypeScript
3. Express.js
4. Sequelize

### 常用指令

1. `yarn watch` 启动Watch服务，包括lint-watch和build-watch。
2. `yarn start:dev` 启动开发服务器。
3. `yarn build` 编译`src`文件夹下的TypeScript源代码。
4. `yarn clean` 删除`bin`和`log`文件夹。

## 部署

软件的运行环境为：

- Node.js 12
- PostgreSQL

本节后续部分假定上述依赖已经完成安装，以在`CentOS 7`上部署为例，演示整体部署过程。

### 为PaperStack API Server创建PostgreSQL用户和数据库

```sh
sudo -u -i postgres # 切换为postgres用户
createuser paperstack # 创建用户paperstack
createdb paperstack -O paperstack # 创建用户paperstack的同名数据库并指定paperstack用户为Owner

psql
\password paperstack # 为paperstack创建密码
\q
exit # 登出postgress用户
```

可以`paperstack`用户身份验证配置：

```sh
psql -U paperstack -d paperstack -h localhost -p 5432 # 尝试使用paperstack用户身份登录
```

### 安装和配置PaperStack API Server

```sh
git clone https://github.com/super-dash/paperstack-api-server.git && cd paperstack-api-server
yarn install
```
