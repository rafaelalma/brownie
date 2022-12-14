/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/userModel'
import validateUser from '../utils/validateUser'
import { UserFields } from '../types/userType'
import logger from '../utils/logger'
import { INVALID_USERNAME_PASSWORD_ERROR_MESSAGE } from '../constants/errorMessages'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const validUser = validateUser(req.body as UserFields)
    const { username, password } = validUser

    const user = await UserModel.findOne({ username })

    const passwordCorrect =
      user === null || user.passwordHash === undefined
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      logger.error(INVALID_USERNAME_PASSWORD_ERROR_MESSAGE)
      return res
        .status(401)
        .json({ error: INVALID_USERNAME_PASSWORD_ERROR_MESSAGE })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    if (!process.env.SECRET) {
      throw new Error('no secret')
    }
    const token = jsonwebtoken.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 5,
    })

    return res.status(200).send({
      token,
      username: user.username,
      name: user.name,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
    })
  } catch (error) {
    return next(error)
  }
})

export default router
