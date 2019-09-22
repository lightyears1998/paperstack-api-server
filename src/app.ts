import fs from 'fs'
import path from 'path';
import config from "./config";
import express from "express";

const serverConfig = config.server;

const app = express();
app.listen(serverConfig.port, () => {
  const version = JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../package.json`), 'utf8')).version

  console.log(`PaperStack API服务器 v${version}`)
  console.log(`正在监听${serverConfig.port}端口。`)
});
