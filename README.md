# PaperStack API Server

[![Build Status](https://travis-ci.com/super-dash/paperstack-api-server.svg?branch=master)](https://travis-ci.com/super-dash/paperstack-api-server)

## 部署

软件的运行环境为：

- Node.js 12
- PostgreSQL

本节后续部分假定上述依赖已经完成安装，以在`CentOS 7`上部署为例，演示整体部署过程。

### 创建PostgreSQL用户和数据库

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

### 安装和配置

```sh
git clone https://github.com/super-dash/paperstack-api-server.git && cd paperstack-api-server
yarn install
```

## 开发者相关

### 技术栈

1. yarn
2. TypeScript
3. Express.js
4. Sequelize
