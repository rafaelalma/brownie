import app from './app';
import logger from './utils/logger';
import config from './utils/config';

const PORT = config.PORT ?? 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
