import * as path from "path";
import * as typeorm from "typeorm";
import * as entities from "./entity";
import Configuration, { DatabaseConfiguration } from "./Configuration";
import logger from "./Logger";



/**
 * 数据库
 *
 * 负责抽象底层数据库接口并提供面向应用程序的编程借口。
 */
export default class Database {
    private config: DatabaseConfiguration

    private dbEntities = [
        entities.User,
        entities.Session,

        entities.Administrator,
        entities.Student,
        entities.Teacher,

        entities.MailAddressVerificationCode,

        entities.CollectionGroup,
        entities.CollectionItem,
        entities.College,
        entities.Product,
        entities.ProductComment,

        entities.College,
        entities.ClassAndGrade
    ]

    private offlineDevConfig: typeorm.ConnectionOptions = {
        name:        "default",
        type:        "sqlite",
        database:    path.resolve(__dirname, "../var/main.sqlite3"),
        entities:    this.dbEntities,
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
        await typeorm.getConnection().close();
    }
}
