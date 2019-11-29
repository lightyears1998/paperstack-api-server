import * as fs from "fs";
import * as path from "path";
import { Server } from "http";
import * as express from "express";
import * as cors from "cors";
import * as routers from "./route";
import logger from "./Logger";
import RootRouter from "./route/RootRouter";
import Configuration from "./Configuration";
import Database from "./Database";


/**
 * 中央控制器
 */
export class CentralControl {
    private static isActive = false;

    private config: Configuration;
    private rootRouter: RootRouter;
    private database: Database;

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

    /**
     * 从文件中加载配置。
     */
    private loadConfigurationFromFile() {
        this.config = Configuration.load();
    }

    /**
     * 挂载路由。
     */
    private mountRouters() {
        // 挂载根路由。
        this.rootRouter = new RootRouter(this.config.server);

        // 为端点挂载路由。
        this.rootRouter.mount("/", routers.WelcomeRouter);
        this.rootRouter.mount("/welcome", routers.WelcomeRouter);
    }

    /**
     * 启动服务。
     */
    public async start(): Promise<void> {
        if (!CentralControl.isActive) {
            this.loadConfigurationFromFile();

            this.database = new Database(this.config.database);
            await this.database.start();

            this.mountRouters();
            this.rootRouter.start();
        }
        CentralControl.isActive = true;
    }

    /**
     * 停止服务。
     */
    public async stop(): Promise<void> {
        if (CentralControl.isActive) {
            this.database.stop();
            this.rootRouter.stop();
        }
        CentralControl.isActive = false;
    }

    /**
     * 从磁盘上加载配置文件并重新启动。
     */
    public async restart(): Promise<void> {
        if (CentralControl.isActive) {
            await this.stop();
            await this.start();
        } else {
            await this.start();
        }
    }
}


const app = new CentralControl();
export default app;
