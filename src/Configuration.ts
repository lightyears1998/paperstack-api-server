import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import * as yaml from "js-yaml";
import { logger } from "./Utils";


interface Configuration {
  server: ServerConfiguration;
  database: DatabaseConfiguration;
}

interface DatabaseConfiguration {
  host: string;
  user: string;
  pass: string;
  db: string;
}

interface ServerConfiguration {
  port: number;
}


/**
 * 从文件中加载配置。
 * @param configPath 配置文件的路径
 */
function loadConfiguration(configPath: string = path.resolve(`${__dirname}/../conf/config.yml`)): Configuration {
    let config: Configuration;

    try {
        config = yaml.safeLoad(fs.readFileSync(path.resolve(configPath), "utf8"));
    } catch (err) {
        logger.error("加载配置文件失败！");
        logger.error("请检查./conf/config.yml文件是否存在，其格式是否有误。");
        process.exit(1);
    }

    return config;
}

const config = loadConfiguration();

export default config;
