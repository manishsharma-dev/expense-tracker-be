const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => {
          const { timestamp, level, message, stack, ...meta } = info;
          const metaOutput = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return stack
            ? `${timestamp} [${level}]: ${message}${metaOutput}\n${stack}`
            : `${timestamp} [${level}]: ${message}${metaOutput}`;
        })
      ),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
