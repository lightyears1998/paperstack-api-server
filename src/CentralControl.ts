import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as cors from "cors";
import router from "./route";
import { getAppVersion, logger } from "./util";
import config from "./Configuration";


/**
 * 中央控制器
 */
export class CentralControl {

}


const appVersion = getAppVersion();
const serverConfig = config.server;

const app = express();

app.use(cors());
app.use(express.json());

app.all("/", (req, res) => {
    res.json({
        "message": "欢迎使用PaperStack API Server。",
        "version": appVersion
    });
});

app.use(router);

app.listen(serverConfig.port, () => {
    logger.info(`PaperStack API服务器 v${appVersion}`);
    logger.info(`正在监听${serverConfig.port}端口。`);
});
