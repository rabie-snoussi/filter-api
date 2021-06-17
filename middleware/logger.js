const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
