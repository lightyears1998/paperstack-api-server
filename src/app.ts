import config from "./config";
import router from "./route";

import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";


const version = JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../package.json`), "utf8")).version;
const serverConfig = config.server;

const app = express();

app.use(cors());
app.use(express.json());

app.all("/", (req, res) => {
  res.json({
    "message": "欢迎使用PaperStack API Server。",
    "version": version
  });
});

app.use(router);

app.listen(serverConfig.port, () => {
  console.log(`PaperStack API服务器 v${version}`);
  console.log(`正在监听${serverConfig.port}端口。`);
});
