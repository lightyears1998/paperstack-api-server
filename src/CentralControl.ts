import * as fs from "fs";
import * as path from "path";
import { Server } from "http";
import * as express from "express";
import * as cors from "cors";
import * as routers from "./route";
import logger from "./Logger";
import RootRouter from "./route/RootRouter";
import Configuration from "./Configuration";


/**
 * 中央控制器
 */
export class CentralControl {
    private static isActive = false;

    private config: Configuration;
    private rootRouter: RootRouter;

    public constructor() {
        this.config = Configuration.load();
        this.rootRouter = new RootRouter(this.config.server);

        // 为端点挂载路由。
        this.rootRouter.mount("/", routers.WelcomeRouter);
        this.rootRouter.mount("/welcome", routers.WelcomeRouter);
    }

    /**
     * 获取软件的版本号。
     *
     * 版本号是形如“major.minor.patch”的字符串。
     */
    public get version() {
        const packageJSONPath = path.resolve(`${__dirname}/../package.json`);
        const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));
        return packageJSON.version;
    }

    public start(): void {
        this.rootRouter.start();
    }

    /**
     * 从磁盘上加载配置文件并重新启动。
     */
    public restart(): void {
        this.rootRouter.stop();
    }

    /**
     * 停止服务。
     */
    public stop(): void {

    }
}


const app = new CentralControl();
export default app;
