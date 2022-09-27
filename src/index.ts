import http from 'http'

import app from './app'
import logger from './utils/logger'
import config from './utils/config'

const PORT = config.PORT

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
