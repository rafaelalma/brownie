/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import userService from '../services/userService'
import { UserFields } from '../types/user'
import toNewUser from '../utils/toNewUser'
import UserModel from '../models/userModel'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const newUser = toNewUser(req.body as UserFields)

    const { username } = newUser

    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'username must be unique' })
    }

    const addedUser = await userService.addUser(newUser)
    return res.status(201).json(addedUser)
  } catch (error) {
    return next(error)
  }
})

export default router
