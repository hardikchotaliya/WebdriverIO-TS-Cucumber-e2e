import winston from "winston";

// Format console.log
const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    return `${timestamp} [${logLevel}]: ${message}`;
});
// Logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL,
            handleExceptions: true,
            format: winston.format.combine(winston.format.timestamp(), consoleFormat)
        })
    ]
});
// Print any unknown error
logger.on("error", error => {
    console.log(error.message, 'error');
});
export default logger;