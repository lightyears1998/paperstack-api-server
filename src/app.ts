import fs from "fs";
import path from "path";
import config from "./config";
import express from "express";

const version = JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../package.json`), "utf8")).version;
const serverConfig = config.server;

const app = express();

app.all("/", (req, res) => {
  res.json({
    "message": "欢迎使用PaperStack API Server。",
    "version": version
  });
});

app.listen(serverConfig.port, () => {
  console.log(`PaperStack API服务器 v${version}`);
  console.log(`正在监听${serverConfig.port}端口。`);
});
