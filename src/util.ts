import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";


/**
 * 获取软件的版本号。
 * 
 * 版本号是形如“major.minor.patch”的字符串。
 */
export function getAppVersion(): string {
    const packageJSONPath = path.resolve(`${__dirname}/../package.json`);
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));
    return packageJSON.version
}


/**
 * 日志工具
 */
const logger = winston.createLogger({
    level:  "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.json()),
    transports: [
        new winston.transports.File({ filename: "log/combined.log", maxFiles: 10, maxsize: 1024 }),
        new winston.transports.File({ filename: "log/error.log", level: "error", maxFiles: 10, maxsize: 1024 })
    ]
});


// 将日志输出到控制台。
logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(info => `${info.level}: ${info.message}`)
    )
}));

export { logger };
