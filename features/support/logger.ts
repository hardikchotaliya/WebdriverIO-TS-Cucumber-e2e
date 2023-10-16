import winston from "winston";

// Define a function to format console messages
const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
    // Colorize and uppercase the log level
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    // Format the log message with timestamp and log level
    return `${timestamp} [${logLevel}]: ${message}`;
});

/**
 * Create a Winston logger with a Console transport.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            // Set log level from the environment variable
            level: process.env.LOG_LEVEL,
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamp to log entries
                consoleFormat // Apply the custom console log format
            )
        })
    ]
});

// Log any unknown errors from the logger
logger.on("error", error => {
    console.log("Unknown error in Winston logger");
    console.log(error.message);
});

export default logger;

// import winston from "winston";

// // Format console.log
// const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
//     const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`)
//     return `${timestamp} [${logLevel}]: ${message}`
// })
// // Logger
// let logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: process.env.LOG_LEVEL,
//             handleExceptions: true,
//             format: winston.format.combine(winston.format.timestamp(), consoleFormat)
//         })
//     ]
// })
// // Print any unknown error
// logger.on("error", error => {
//     console.log("Unknown error in Winston logger")
//     console.log(error.message)
// })
// export default logger