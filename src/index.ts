import express from 'express';

import logger from '../utils/logger';
import config from '../utils/config';
import dogRouter from './routes/dogRouter';

const app = express();

app.use(express.json());

const PORT = config.PORT ?? 3001;

app.use('/api/dogs', dogRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
