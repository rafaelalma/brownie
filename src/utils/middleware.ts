import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'

import logger from './logger'
import UserModel from '../models/userModel'
import { RequestCustom } from '../types/expressType'
import { Role } from '../types/userType'

const getTokenFrom = (req: Request) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

const requestLogger = (
  req: RequestCustom,
  _res: Response,
  next: NextFunction
) => {
  logger.info('\n')
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)

  return next()
}

const tokenExtractor = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req)
  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }
  req.token = token

  return next()
}

const tokenVerifier = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.SECRET) {
    throw new Error('no secret')
  }
  if (!req.token) {
    throw new Error('no token')
  }
  const decodedToken = jsonwebtoken.verify(
    req.token,
    process.env.SECRET
  ) as JwtPayload
  if (!decodedToken) {
    return res.status(401).json({ error: 'token invalid' })
  }

  req.decodedToken = decodedToken

  return next()
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const userExtractor = async (
  req: RequestCustom,
  _res: Response,
  next: NextFunction
) => {
  if (!req.decodedToken) {
    throw new Error('no decoded token')
  }
  const user = await UserModel.findById(req.decodedToken.id)

  if (!user) {
    throw new Error('no user')
  }
  req.user = {
    username: user.username as string,
    roles: user.roles as Role[],
  }

  return next()
}

const userLogger = (req: RequestCustom, _res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new Error('no user')
  }

  logger.info(req.user)

  return next()
}

const volunteerVerifier = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error('no user')
  }

  if (!req.user.roles.some((role) => role >= Role.Volunteer)) {
    const errorMessage = 'unauthorized role'
    logger.error(errorMessage)
    return res.status(401).json({ error: errorMessage })
  }

  return next()
}

const veteranVerifier = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error('no user')
  }

  if (!req.user.roles.some((role) => role >= Role.Veteran)) {
    const errorMessage = 'unauthorized role'
    logger.error(`${errorMessage}\n`)
    return res.status(401).json({ error: errorMessage })
  }

  return next()
}

const coordinatorVerifier = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error('no user')
  }

  if (!req.user.roles.some((role) => role >= Role.Coordinator)) {
    const errorMessage = 'unauthorized role'
    logger.error(`${errorMessage}\n`)
    return res.status(401).json({ error: errorMessage })
  }

  return next()
}

const administratorVerifier = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error('no user')
  }

  if (!req.user.roles.some((role) => role >= Role.Administrator)) {
    const errorMessage = 'unauthorized role'
    logger.error(`${errorMessage}\n`)
    return res.status(401).json({ error: errorMessage })
  }

  return next()
}

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (error instanceof Error) {
    logger.error(error.message)

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'TypeError') {
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'MissingDogError') {
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'expired token' })
    } else if (error.name === 'MongoServerError') {
      return res.status(500).send({ error: error.message })
    } else {
      return res.status(500).send({ error: error.message })
    }
  }

  return next(error)
}

export default {
  tokenExtractor,
  tokenVerifier,
  userExtractor,
  userLogger,
  volunteerVerifier,
  veteranVerifier,
  coordinatorVerifier,
  administratorVerifier,
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
