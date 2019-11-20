import * as fs from "fs";
import * as path from "path";
import { Server } from "http";
import * as express from "express";
import * as cors from "cors";
import router from "./route";
import logger from "./logger";
import config from "./Configuration";


/**
 * 中央控制器
 */
export class CentralControl {
    private static isActive = false;

    private httpServer: Server;
    private rootRouter: express.Express;

    public constructor() {
        this.rootRouter = express();

        this.rootRouter.use(cors());
        this.rootRouter.use(express.json());

        /**
         * 向根路由上挂载路由节点。
         * @todo 搬迁Router.mount()静态方法到此处。
         */
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

    }

    /**
     * 从磁盘上加载配置文件并重新启动。
     */
    public restart(): void {

    }

    /**
     * 停止服务。
     */
    public stop(): void {

    }
}


const serverConfig = config.server;
const app = express();



app.all("/", (req, res) => {
    res.json({
        "message": "欢迎使用PaperStack API Server。",
        "version": "appVersion"
    });
});

const appVersion = 23;

app.use(router);

app.listen(serverConfig.port, () => {
    logger.info(`PaperStack API服务器 v${appVersion}`);
    logger.info(`正在监听${serverConfig.port}端口。`);
});

export default app;
