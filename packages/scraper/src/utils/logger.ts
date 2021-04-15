import winston, { format } from 'winston';

const { combine, colorize, timestamp, align, printf } = format;
const customFormat: winston.Logform.Format = combine(
  colorize(),
  timestamp(),
  align(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger: winston.Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  transports: [new winston.transports.Console()],
});

export default logger;
