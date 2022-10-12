import bcrypt from 'bcrypt'

import UserModel from '../models/userModel'
import { NewUser, AddedUser, User } from '../types/userType'

const SALT_ROUNDS = 10

const getUsers = async () => {
  const users: User[] = await UserModel.find({})
  return users
}

const addUser = async (body: NewUser) => {
  const { username, password, name, phone, email, roles } = body

  const passwordHash: string = await bcrypt.hash(password, SALT_ROUNDS)

  const user = new UserModel({
    createTime: new Date(),
    updateTime: null,
    username,
    passwordHash,
    name,
    phone,
    email,
    roles,
  })

  const addedUser = (await user.save()) as AddedUser

  return addedUser
}

export default {
  getUsers,
  addUser,
}
