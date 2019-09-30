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


if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
