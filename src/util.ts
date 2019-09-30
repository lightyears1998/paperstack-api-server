import winston from "winston";


/**
 * 日志工具Winston Logger
 */
export const logger = winston.createLogger({
  level:      "info",
  format:     winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "log/combined.log" }),
    new winston.transports.File({ filename: "log/error.log", level: "error" })
  ]
});


// 如果当前为开发环境，则也将日志输出到控制台。
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    )
  }));
}
