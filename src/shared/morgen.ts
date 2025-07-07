import { Request, Response } from 'express';
import morgan from 'morgan';
import config from '../config';
import { errorLogger, logger } from './logger';

morgan.token(
  'message',
  (req: Request, res: Response) => res?.locals.errorMessage || ''
);

const getIpFormat = () =>
  config.node_env === 'development' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => errorLogger.error(message.trim()) },
});

export const Morgan = { errorHandler, successHandler };
