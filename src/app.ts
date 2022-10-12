import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import userRouter from './routes/userRouter'
import loginRouter from './routes/loginRouter'
import dogRouter from './routes/dogRouter'
import logger from './utils/logger'
import config from './utils/config'
import middleware from './utils/middleware'

const app = express()

const url = config.MONGODB_URI

if (url) {
  logger.info('Connecting to', url)

  mongoose
    .connect(url)
    .then(() => {
      logger.info('Connected to MongoDB')
    })
    .catch((error: unknown) => {
      let errorMessage = 'Error connecting to MongoDB.'
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
      }
      logger.error(errorMessage)
    })
} else {
  logger.error('No MongoDB URI')
}

app.use(express.static('build-app'))

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors())

app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.use('/api/dogs', dogRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

export default app
