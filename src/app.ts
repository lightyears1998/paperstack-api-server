import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import router from "./route";
import { logger } from "./util";
import config from "./config";


const appVersion = JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../package.json`), "utf8")).version;
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
