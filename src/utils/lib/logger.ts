import winston from 'winston';
import kleur from 'kleur';
import { logger_config } from './config';

const levelColors = {
  error: kleur.red,
  warn: kleur.yellow,
  info: kleur.cyan,
  debug: kleur.magenta,
};

function colorizeType(level: string, type: string) {
  const colorFn = levelColors[level as keyof typeof levelColors] || kleur.white;
  return colorFn(type);
}

const customLogFormat = winston.format.printf(({ message, timestamp, type, level }) => {
  const coloredTimestamp = kleur.gray(`[${new Date(timestamp).toLocaleString(logger_config.locales, logger_config)}]`); 
  const coloredType = colorizeType(level, type); 
  return `${coloredTimestamp} ${coloredType}: ${message}`;
});


const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
  }),
    winston.format(info => {
      info.type = info.type || info.level; 
      return info;
    })(),
    customLogFormat 
  ),
  transports: [
    new winston.transports.Console(), 
  ],
});


const logger = Object.freeze({
  errorWithType(type: string, message: string) {
    Logger.error({ message, type });
  },

  warnWithType(type: string, message: string) {
    Logger.warn({ message, type });
  },

  infoWithType(type: string, message: string) {
    Logger.info({ message, type });
  },

  debugWithType(type: string, message: string) {
    Logger.debug({ message, type });
  },

  ...Logger, 
});

export default logger;
