import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

export const logError = (error: Error, context?: string) => {
  logger.error({
    error: {
      message: error.message,
      stack: error.stack
    },
    context
  });
};
