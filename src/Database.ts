import * as path from "path";
import * as typeorm from "typeorm";
import Configuration, { DatabaseConfiguration } from "./Configuration";
import logger from "./Logger";


/**
 * 数据库
 *
 * 负责抽象底层数据库接口并提供面向应用程序的编程借口。
 */
export default class Database {
    private config: DatabaseConfiguration

    private offlineDevConfig: typeorm.ConnectionOptions = {
        name:     "main",
        type:     "sqlite",
        database: path.resolve(__dirname, "../var/main.sqlite3"),
        entities: [

        ],
        logging:     true,
        synchronize: true
    }

    public constructor(config: DatabaseConfiguration) {
        this.config = config;
    }

    /**
     * 启动数据库接口服务。
     */
    public async start(): Promise<void> {
        switch (process.env.NODE_ENV) {
            default:
            case "production": {
                throw "未实现数据库的production模式设置。";
            }
            case "development": {
                await typeorm.createConnection(this.offlineDevConfig);
                break;
            }
            case "development:online": {
                throw "未实现数据库的development:online模式设置。";
            }
        }
    }

    /**
     * 停止数据库接口服务。
     */
    public async stop(): Promise<void> {

    }
}
