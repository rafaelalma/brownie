/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import userService from '../services/userService'
import { UserFields } from '../types/user'
import toNewUser from '../utils/toNewUser'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const newUser = toNewUser(req.body as UserFields)

    const { username, password } = newUser

    if (!username) {
      return res.status(400).json({ error: 'user must have an username' })
    }
    if (!password) {
      return res.status(400).json({ error: 'user must have a password' })
    }

    const addedUser = await userService.addUser(newUser)
    return res.status(201).json(addedUser)
  } catch (error) {
    return next(error)
  }
})

export default router
