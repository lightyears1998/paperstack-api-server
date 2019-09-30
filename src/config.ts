import { logger } from "./util";

import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import process from "process";


interface Configuration {
  server: ServerConfiguration,
  database: DatabaseConfiguration
}

interface DatabaseConfiguration {
  host: string,
  user: string,
  pass: string,
  db: string
}

interface ServerConfiguration {
  port: Number
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
    logger.error(err);
    process.exit(1);
  }

  return config;
}

const config = loadConfiguration();

export default config;
