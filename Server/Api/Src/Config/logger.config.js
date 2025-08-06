import winston from "winston";
import path from "path";
import fs from "fs";

//! Create logs directory
const logDir = "./src/Logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

//! Base log format (without color)
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

//! Console format with color
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

//! Create logger
const logger = winston.createLogger({
  level: "info",
  format: baseFormat,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),

    //! All logs including info, warn, error
    new winston.transports.File({ filename: path.join(logDir, "app.log") }),

    //! Only errors
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),

    //! Only warnings
    new winston.transports.File({
      filename: path.join(logDir, "warn.log"),
      level: "warn",
    }),
  ],
});

export default logger;
