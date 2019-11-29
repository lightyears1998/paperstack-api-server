import * as path from "path";
import * as fs from "fs-extra";
import * as winston from "winston";

let logPath: string;
switch (process.env.NODE_ENV) {
    default:
    case "production": {
        logPath = path.resolve(__dirname, "../var/log");
    }
    case "development":
    case "development:online": {
        logPath = path.resolve(__dirname, "../var/log");
    }
}

fs.ensureDir(logPath);


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
        new winston.transports.File({ filename: `${logPath}/combined.log`, maxFiles: 10, maxsize: 1024 }),
        new winston.transports.File({ filename: `${logPath}/error.log`, level: "error", maxFiles: 10, maxsize: 1024 })
    ]
});


// 将日志输出到控制台。
logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(info => `${info.level}: ${info.message}`)
    )
}));

export default logger;
