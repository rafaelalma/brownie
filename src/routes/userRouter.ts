/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import userService from '../services/userService'
import { UserFields } from '../types/userType'
import validateUser from '../utils/validateUser'
import UserModel from '../models/userModel'
import logger from '../utils/logger'

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const users = await userService.getUsers()
    return res.json(users)
  } catch (error) {
    return next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const validUser = validateUser(req.body as UserFields)

    const { username } = validUser

    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
      const errorMesage = 'username must be unique'
      logger.error(errorMesage)
      return res.status(400).json({ error: errorMesage })
    }

    const addedUser = await userService.addUser(validUser)
    return res.status(201).json(addedUser)
  } catch (error) {
    return next(error)
  }
})

export default router
