// Log4js配置
module.exports = {
  appenders: {
    ccnaserver: {
      type: 'dateFile',
      filename: './logs/ccnaserver',
      pattern: '-yyyy-MM-dd-hh.log',
    },
    console: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['ccnaserver', 'console'],
      level: 'all',
    },
  },
};
