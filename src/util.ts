import * as winston from "winston";


/**
 * 日志工具Winston Logger
 */
export const logger = winston.createLogger({
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


// 如果当前为开发环境，则也将日志输出到控制台。
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(info => `${info.level}: ${info.message}`)
        )
    }));
}
