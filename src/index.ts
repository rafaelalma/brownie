import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import dogRouter from './routes/dogRouter';
import logger from '../utils/logger';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3001;

app.get('/ping', (_req, res) => {
  logger.info('Someone pinged here');
  res.send('pong');
});

app.use('/api/dogs', dogRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
