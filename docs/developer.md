# 开发者参考资料

## `typeorm`

- [TypeORM](https://typeorm.io)

## 软件包依赖

- **Bcrypt3.0.6** 暂时不能升级到3.0.7，因为3.0.7没有发布Windows平台上的预编译软件，而Windows平台上难以编译。
- **Validator12.0.0** `tsconfig.json`中不能启用`esModuleInterop`，否则`tsc`会报循环引用错误。
