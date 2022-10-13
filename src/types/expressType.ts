import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { RequestUser } from './userType'

export interface RequestCustom extends Request {
  token?: string
  decodedToken?: JwtPayload
  user?: RequestUser
}
