import { createLogger, transports, format } from "winston";

// ログレベル
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// ログカラー
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// ログフォーマット
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toLowerCase()}: ${message}`;
  })
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
