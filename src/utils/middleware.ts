import { RequestHandler, ErrorRequestHandler } from 'express';

import logger from './logger';

const requestLogger: RequestHandler = (req, _res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (error instanceof Error) {
    logger.error(error.message);

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
  }

  return next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
