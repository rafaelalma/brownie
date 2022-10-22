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
import {
  EXPIRED_TOKEN_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR_MESSAGE,
  MALFORMATTED_ID_ERROR_MESSAGE,
  MISSING_TOKEN_ERROR_MESSAGE,
  UNAUTHORIZED_ROLE_ERROR_MESSAGE,
  UNKNOWN_ENDPOINT_ERROR_MESSAGE,
} from '../constants/errorMessages'

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
    logger.error(MISSING_TOKEN_ERROR_MESSAGE)
    return res.status(401).json({ error: MISSING_TOKEN_ERROR_MESSAGE })
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
    logger.error(INVALID_TOKEN_ERROR_MESSAGE)
    return res.status(401).json({ error: INVALID_TOKEN_ERROR_MESSAGE })
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
    logger.error(UNAUTHORIZED_ROLE_ERROR_MESSAGE)
    return res.status(401).json({ error: UNAUTHORIZED_ROLE_ERROR_MESSAGE })
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
    logger.error(UNAUTHORIZED_ROLE_ERROR_MESSAGE)
    return res.status(401).json({ error: UNAUTHORIZED_ROLE_ERROR_MESSAGE })
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
    logger.error(UNAUTHORIZED_ROLE_ERROR_MESSAGE)
    return res.status(401).json({ error: UNAUTHORIZED_ROLE_ERROR_MESSAGE })
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
    logger.error(UNAUTHORIZED_ROLE_ERROR_MESSAGE)
    return res.status(401).json({ error: UNAUTHORIZED_ROLE_ERROR_MESSAGE })
  }

  return next()
}

const unknownEndpoint: RequestHandler = (_req, res) => {
  logger.error(UNKNOWN_ENDPOINT_ERROR_MESSAGE)
  res.status(404).send({ error: UNKNOWN_ENDPOINT_ERROR_MESSAGE })
}

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (error instanceof Error) {
    if (error.name === 'CastError') {
      logger.error(MALFORMATTED_ID_ERROR_MESSAGE)
      return res.status(400).send({ error: MALFORMATTED_ID_ERROR_MESSAGE })
    } else if (error.name === 'ValidationError') {
      logger.error(error.message)
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'TypeError') {
      logger.error(error.message)
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'MissingDogError') {
      logger.error(error.message)
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      logger.error(INVALID_TOKEN_ERROR_MESSAGE)
      return res.status(401).json({ error: INVALID_TOKEN_ERROR_MESSAGE })
    } else if (error.name === 'TokenExpiredError') {
      logger.error(EXPIRED_TOKEN_ERROR_MESSAGE)
      return res.status(401).json({ error: EXPIRED_TOKEN_ERROR_MESSAGE })
    } else if (error.name === 'MongoServerError') {
      logger.error(error.message)
      return res.status(500).send({ error: error.message })
    } else {
      logger.error(error.message)
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
