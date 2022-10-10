import { isArray, isString } from './typeCheck'
import { UserFields, NewUser, Role } from '../types/user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRole = (param: any): param is Role => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Role).includes(param)
}

const isArrayOfRoles = (params: unknown[]): params is Role[] => {
  if (params.some((param) => !isRole(param))) {
    return false
  }

  return true
}

const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    const typeError = new Error('incorrect or missing username')
    typeError.name = 'TypeError'
    throw typeError
  }

  return username
}

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    const typeError = new Error('incorrect or missing password')
    typeError.name = 'TypeError'
    throw typeError
  }

  return password
}

const parseName = (name: unknown): string | null => {
  if (!name || !isString(name)) {
    return null
  }

  return name
}

const parsePhone = (phone: unknown): string | null => {
  if (!phone || !isString(phone)) {
    return null
  }

  return phone
}

const parseEmail = (email: unknown): string | null => {
  if (!email || !isString(email)) {
    return null
  }

  return email
}

const parseRoles = (roles: unknown): Role[] => {
  if (!roles || !isArray(roles) || !isArrayOfRoles(roles)) {
    return [Role.User]
  }

  return [...new Set(roles)]
}

const toNewUser = ({
  username,
  password,
  name,
  phone,
  email,
  roles,
}: UserFields): NewUser => {
  const newUser: NewUser = {
    username: parseUsername(username),
    password: parsePassword(password),
    name: parseName(name),
    phone: parsePhone(phone),
    email: parseEmail(email),
    roles: parseRoles(roles),
  }

  return newUser
}

export default toNewUser