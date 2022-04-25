const env = require('common-env')()

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new (transports.Console)({'timestamp':true}),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const config = env.getOrElseAll({
  logger,
  fhghq: {
    url: 'http://localhost:3000'
  },
  steamApi: {
    key: ''
  },
  warApi: {
    liveUrl: 'https://war-service-live.foxholeservices.com'
  },
  discord: {
    token: ''
  },
  sqlLite: {
    fileNameGiven : {
      $default: './.data/FHGHQ.db'
    }
  }
})

module.exports = config
