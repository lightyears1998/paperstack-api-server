import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import * as yaml from "js-yaml";
import logger from "./Logger";


export interface ServerConfiguration {
    port: number;
    enableRegister: boolean;
}


export interface DatabaseConfiguration {
    host: string;
    user: string;
    pass: string;
    db: string;
}


export default class Configuration {
    server: ServerConfiguration;
    database: DatabaseConfiguration;

    static load(configPath: string = path.resolve(`${__dirname}/../conf/config.yml`)): Configuration {
        let config: Configuration;

        try {
            config = yaml.safeLoad(fs.readFileSync(path.resolve(configPath), "utf8"));
        } catch (err) {
            logger.error("加载配置文件失败！");
            logger.error(`请检查${configPath}文件是否存在，其格式是否有误。`);
            process.exit(1);
        }

        return config;
    }
}
