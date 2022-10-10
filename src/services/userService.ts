import bcrypt from 'bcrypt'

import UserModel from '../models/userModel'
import { NewUser, AddedUser } from '../types/user'

const SALT_ROUNDS = 10

const addUser = async (body: NewUser) => {
  const { username, password, name, email, roles } = body

  const passwordHash: string = await bcrypt.hash(password, SALT_ROUNDS)

  const user = new UserModel({
    username,
    passwordHash,
    name,
    email,
    roles,
  })

  const addedUser = (await user.save()) as AddedUser

  return addedUser
}

export default {
  addUser,
}
